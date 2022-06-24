const JWT = require("jsonwebtoken");

const service = require("../services/people.service");
const applicationService = require("../services/applications.service");

async function login(req, res, next) {
    try {

        const { username, password } = req.body;

        const user = await service.getUser(username);

        if (!user || !service.samePassword(password, user.password)) {

            return res
                .status(401)
                .json({ message: 'Nome de usuário ou senha inválidos' });

        }

        delete user.password;

        const secondsToExpire = 60 * 60;

        const token = JWT.sign(
            user,
            process.env.PRIVATE_KEY,
            {
                algorithm: "RS256",
                expiresIn: secondsToExpire
            }
        );

        res.cookie("token", token, { maxAge: secondsToExpire * 1000 });
        res.status(200).json({ token });

    } catch (e) {

        console.error(`Erro interno.`);
        next(e);

    }
}

async function external(req, res) {

    const { token } = req.cookies;
    const { appId, lastUri } = req.query;

    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    if (appId && token) {

        const application = await applicationService.getApplication(appId);

        if (!application) {
            return res.status(401).json({ "erro": "Aplicação desconhecida" });
        }

        const redirectUrl = application.callback_url
            + '?token=' + token
            + (lastUri ? '&lastUri=' + lastUri : '');
        return res.redirect(301, redirectUrl);

    }
    
    res.send(req.cookies);

}

module.exports = {
    login,
    external
}
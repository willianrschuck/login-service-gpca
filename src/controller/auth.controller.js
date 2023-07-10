const JWT = require("jsonwebtoken");
const service = require("../services/auth.service");

async function login(req, res, next) {
    try {

        const { username, password } = req.body;

        const user = await service.getUserByUsername(username);

        if (!user || !service.samePassword(password, user.password)) {
            return res
                .status(401)
                .json({ message: 'Nome de usuário ou senha inválidos' });
        }

        delete user.password;

        const secondsToExpire = 4 * 60 * 60; // 4 hours

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

async function getGoogleKey(header, callback) {
    let response = await fetch('https://www.googleapis.com/oauth2/v1/certs');
    let keySet = await response.json();
    callback(null, keySet[header.kid]);
}

async function googleLogin(req, res, next) {
    try {

        const { credential } = req.body;

        JWT.verify(credential, getGoogleKey, async (err, decoded) => {

            if (err) {
                return res.status(401).json({ 'auth': 'false', 'message': 'Token inválido.' });
            }

            if (decoded.aud !== process.env.GOOGLE_CLIENT_ID) {
                return res.status(401).json({ 'auth': 'false', 'message': 'Login com Google: Domínio inválido.' });
            }

            const user = await service.getUserByEmail(decoded.email);

            if (!user) {
                return res.status(401).json({ 'auth': 'false', 'message': 'Login com Google: Usuário local não encontrado.' });
            }

            delete user.password;

            const secondsToExpire = 4 * 60 * 60; // 4 hours

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

        });

    } catch (e) {

        console.error(`Erro interno.`);
        next(e);

    }
}

async function logout(req, res) {
    try {
        const { token } = req.body;
        
        if (isValid(token)) {
            await service.invalidateToken(token);
        }

        res.status(200).json({ message: "Token invalidado" });
    } catch (e) {
        res.status(401).json({ message: "Erro ao invalidar token" });
    }
}

function isValid(token) {
    try {
        JWT.verify(token, process.env.PUBLIC_KEY);
        return true;
    } catch (e) {
        console.log(e)
        return false;
    }
}

async function validate(req, res) {

    try {

        const { token } = req.body;

        const valid = isValid(token);
        const revoked = await service.isTokenRevoked(token);

        if (!valid) {
            return res.status(401).json({ message: "Invalid token" });
        }
    
        if (revoked) {
            return res.status(401).json({ message: "Token revoked" });
        }

        return res.status(200).json({ message: "Valid token" });

    } catch (e) {

        console.log(e)
        return res.status(401).json({ message: "Erro interno" });

    }
}

module.exports = {
    login,
    logout,
    googleLogin,
    validate
}
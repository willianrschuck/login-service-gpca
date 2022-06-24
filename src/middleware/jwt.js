const JWT = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = (authHeader && authHeader.split(' ')[1]) || req.cookies.token;

    if (!token) {
        return res.status(401).json({ 'auth': 'false', 'message': 'Token não informado' });
    }
    JWT.verify(token, process.env.PUBLIC_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ 'auth': 'false', 'message': 'Token inválido' });
        }

        req.user = {
            id: decoded.id,
            login: decoded.login,
            e_mail: decoded.e_mail,
            people_type: decoded.people_type
        };

        next();
    });
}

module.exports = {
    verifyToken
}
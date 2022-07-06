const JWT = require("jsonwebtoken");

const applicationService = require("../services/applications.service");

async function getApplication(req, res, next) {
    try {

        const { id } = req.params;

        const app = await applicationService.getApplication(id);

        res.status(200).json( app );

    } catch (e) {

        console.error(`Erro interno.`);
        next(e);

    }
}

module.exports = {
    getApplication
}
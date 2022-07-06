const db = require("../config/db");

async function getApplication(id) {
    try {
        return await db("applications").select("callback_url", "background", "name").where("id", id).first();
    } catch (e) {
        console.log(e);
        return null;
    }
}

module.exports = {
    getApplication
}
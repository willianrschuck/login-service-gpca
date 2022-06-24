const db = require("../config/db");
const bcrypt = require("bcrypt");

async function getUser(username) {
    try {
        
        return await db
            .select("login", "people_type", "e_mail", "password")
            .from("people")
            .where("login", username)
            .first();

    } catch (e) {

        console.log(e);
        return null;

    }
}

function samePassword(plain, encrypted) {
    return bcrypt.compareSync(plain, encrypted);
}

module.exports = {
    getUser,
    samePassword
}
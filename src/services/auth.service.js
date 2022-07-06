const db = require("../config/db");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

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

async function isTokenRevoked(token) {
    try {

        const result = await db.select('*').from("tokens").where("token", token).first();
        
        return !!result;

    } catch (e) {

        console.log(e)

    }
}

async function invalidateToken(token) {
    try {

        const data = JWT.decode(token);

        const alreadyRevoked = !!await db.select("*").from("tokens").where("token", token).first();

        if (alreadyRevoked) return;

        const expireDate = new Date(data.exp * 1000);

        await db.insert({ token, expire_at: expireDate }).into("tokens")

    } catch (e) {

        console.log(e);

    }
}

function samePassword(plain, encrypted) {
    return bcrypt.compareSync(plain, encrypted);
}

async function clearExpiredRevokedTokens() {

    await db.delete().from("tokens")
        .where("expire_at", "<=", new Date())
        .orderBy("id");

}

module.exports = {
    getUser,
    isTokenRevoked,
    samePassword,
    invalidateToken,
    clearExpiredRevokedTokens
}
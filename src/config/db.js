const db = require("knex").knex({
    client: "pg",
    connection: process.env.DATABASE_URL
});

module.exports = db;
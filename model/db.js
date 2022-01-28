const Pool = require("pg").Pool

const config = new Pool ({
    user:"postgres",
    database:"cyberspawns",
    host:"localhost",
    port:5432,
    password:"25071999"
})

module.exports = config;
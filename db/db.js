const Sequelize = require("sequelize")
require('dotenv').config()

module.exports = new Sequelize(database=process.env.DB_DATABASE, user=process.env.DB_USER, password=process.env.DB_PASSWORD, {
    host:process.env.DB_HOST,
    dialect:"postgres",
    logging:false,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        },
    },

    pool:{
        max:5,
        min:0,
        idle:1000
    }
})
const Sequelize = require("sequelize")
const DBConfig = require("../config")
require('dotenv').config()


const SSLOption = (env) =>{
    if(env === "production"){
        return {
            host:DBConfig.DB_HOST,
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

    }
}else{
    return{
            host:DBConfig.DB_HOST,
            dialect:"postgres",
            logging:false,
            pool:{
                max:5,
                min:0,
                idle:1000
            }

    }
 } 
}

module.exports = new Sequelize(database=DBConfig.DB_DATABASE, user=DBConfig.DB_USER, password=DBConfig.DB_PASSWORD, SSLOption(DBConfig.NODE_ENV))
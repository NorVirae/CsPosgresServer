const { DataTypes } = require("sequelize")
const sequelize = require("../db/db")


module.exports = sequelize.define("stats", {
    morale: {type:DataTypes.INTEGER}, 
    skill: {type:DataTypes.INTEGER}, 
    health: {type:DataTypes.INTEGER}, 
    speed: {type:DataTypes.INTEGER, defaultValue:4}, 

},
{tableName:"stats"},
{timestamps:true}
)
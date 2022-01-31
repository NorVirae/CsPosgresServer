const { DataTypes} = require('sequelize')
const sequelize = require('../db/db')

// console.log(sequelize)
module.exports = sequelize.define('spawns', {
    ownerid:{type:DataTypes.UUID},
    birthdate:{type:DataTypes.BIGINT, defaultValue:Date.now()},
    chain:{type: DataTypes.STRING},
    parents:{type: DataTypes.ARRAY(DataTypes.INTEGER)},
    children:{type: DataTypes.ARRAY(DataTypes.INTEGER)},
    level:{type:DataTypes.INTEGER},
    class:{type:DataTypes.STRING},
    name:{type:DataTypes.STRING},
    parts:{type: DataTypes.ARRAY(DataTypes.STRING)},
    image:{type:DataTypes.STRING},
    statsid:{type:DataTypes.INTEGER},
    speed:{type:DataTypes.INTEGER},
    skill:{type:DataTypes.INTEGER},
    health:{type:DataTypes.INTEGER},
    morale:{type:DataTypes.INTEGER},
    
    breedcount:{type:DataTypes.INTEGER},
    
},
{tableName:'spawns'},
{timestamps:true}
)

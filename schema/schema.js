const graphql = require('graphql')
const Pool = require('../db/db');
const {Sequelize, DataTypes, where} = require('sequelize');
const db = require('../db/db');
const spawnsModel = require('../models/spawns.model');
const statsModel = require('../models/stats.model');
require('dotenv').config()

const restructureResult = (Arr) => {
    let newDats = []
    Arr.map(eachData=>{
        newDats.push(eachData.dataValues)
    })

    return newDats
}



const sequelize = db



const checkConnection = () =>{
    sequelize.authenticate().then(res => {
        console.log("Database connection was successful!")
    }).catch(err =>{
        console.log("Database connection Failed", err)
    })
}


checkConnection()



const Spawns = spawnsModel
const Stats = statsModel
Stats.sync()
Spawns.sync()


const {GraphQLObjectType,GraphQLSchema, GraphQLFloat, GraphQLInt, GraphQLID, GraphQLBoolean, GraphQLList, GraphQLString} = graphql

const StatsType = new GraphQLObjectType({
    name: "Stats",
    fields: () => ({
        id:{type:GraphQLInt},
        skill:{type:GraphQLInt},
        speed:{type:GraphQLInt},
        health:{type:GraphQLInt},
        morale:{type:GraphQLInt},
    })
})

const SpawnType = new GraphQLObjectType({
    name:"Spawn",
    fields: () =>({
            id:{type:GraphQLInt},
            spawnid:{type:GraphQLInt},
            updatedAt:{type:GraphQLString},
            createdAt:{type:GraphQLString},
            ownerid:{type:GraphQLID},
            birthdate:{type:GraphQLInt},
            chain:{type: GraphQLString},
            parents:{type: new GraphQLList(GraphQLInt)},
            children:{type: new GraphQLList(GraphQLInt)},
            spawns:{type:new GraphQLList(SpawnType),
                    async resolve(parent){
                        try{
                            let listedSpawns = await Spawns.findAll({
                                where:{id:parent.parents}
                            })
                            return restructureResult(listedSpawns)
                        }
                        catch(err){
                            return []
                        }
                    }},
            level:{type:GraphQLInt},
            class:{type:GraphQLString},
            name:{type:GraphQLString},
            parts:{type:new GraphQLList(GraphQLString)},
            image:{type:GraphQLString},
            statsid:{type:GraphQLInt},
            speed:{type:GraphQLInt},
            skill:{type:GraphQLInt},
            health:{type:GraphQLInt},
            morale:{type:GraphQLInt},
            stats:{type:StatsType,
                    async resolve(parent, args){
                        try{
                            fetchedStats = await Stats.findOne({where:{id:parent.statsid}})
                            return fetchedStats.dataValues
                        }
                        catch(err){
                            return {}
                        }
                    }},
            breedcount:{type:GraphQLInt},
            deleteCount:{type:GraphQLInt}
    })
})

const UserType = new GraphQLObjectType({
    name:"User",
    fields: () =>({
            id:{type:GraphQLID},
            username:{type:GraphQLString},
            email:{type:GraphQLString},
            password:{type: GraphQLString},
            role:{type:GraphQLString},
            image:{type:GraphQLString},
            isVerified:{type:GraphQLBoolean},
            
    })
})


const RootQueryType = new GraphQLObjectType({
    name:"RootQuery",
    fields: {
        spawns:{
            type:new GraphQLList(SpawnType),
            async resolve(parents){
                try{
                    const newSpawn = await Spawns.findAll()

                    return restructureResult(newSpawn)
                }
                catch(err){
                    throw new console.error(err);
                }
               
            }

        },

        spawn:{
            type:SpawnType,
            args:{id:{type:GraphQLInt}},
            async resolve(parents, args){
                try{
                const oneSpawn = await Spawns.findOne({
                    where:{id:args.id}
                })
                return oneSpawn?oneSpawn.dataValues:{}
            }

            catch(err){
                throw new console.error(err);
                }
            }

        },

        users:{
            type:new GraphQLList(UserType),
            resolve(parents){
                return "Spawns.find()"
            }

        },

        user:{
            type:SpawnType,
            args:{id:{type:GraphQLID}},
            resolve(parents, args){
                return "Spawns.findById(args.id)"
            }

        }
    }
})

const Mutation = new GraphQLObjectType({
    name:"Mutation", 
    fields:{
        createSpawn:{
            type:SpawnType,
            args:{id:{type:GraphQLInt},
            ownerid:{type:GraphQLID},
            chain:{type: GraphQLString},
            children:{type: new GraphQLList(GraphQLInt)},
            parents:{type: new GraphQLList(GraphQLInt)},
            level:{type:GraphQLInt},
            class:{type:GraphQLString},
            name:{type:GraphQLString},
            parts:{type:new GraphQLList(GraphQLString)},
            image:{type:GraphQLString},
            statsid:{type:GraphQLInt},
            speed:{type:GraphQLInt},
            skill:{type:GraphQLInt},
            health:{type:GraphQLInt},
            morale:{type:GraphQLInt},
            breedcount:{type:GraphQLInt},

        },

        async resolve(parent, args){
            try {
                const stats = {speed:args.speed, health:args.health, morale:args.morale, skill:args.skill}
                const newStats = await  Stats.create({
                    morale:args.morale,
                    skill:args.skill,
                    health:args.health,
                    speed:args.speed
                })
                args.statsid = newStats.dataValues.id

                const newSpawn = await Spawns.create(args)

                return newSpawn.dataValues

            }
            catch(err){
                return err
            }
           
        }
     },

     spawn:{
        type:SpawnType,
        args:{id:{type:GraphQLInt}},
        async resolve(parents, args){
            try{
            const oneSpawn = await Spawns.findOne({
                where:{id:args.id}
            })
            return oneSpawn?oneSpawn.dataValues:{}
        }

        catch(err){
            throw new console.error(err);
            }
        }

    },

     editSpawn:{
         type:SpawnType,
         args:{id:{type:GraphQLInt},
         ownerid:{type:GraphQLID},
         birthdate:{type:GraphQLString},
         chain:{type: GraphQLString},
         children:{type: new GraphQLList(GraphQLInt)},
         parents:{type: new GraphQLList(GraphQLInt)},
         level:{type:GraphQLInt},
         class:{type:GraphQLString},
         name:{type:GraphQLString},
         parts:{type:new GraphQLList(GraphQLString)},
         image:{type:GraphQLString},
         statsid:{type:GraphQLInt},
         speed:{type:GraphQLInt},
         skill:{type:GraphQLInt},
         health:{type:GraphQLInt},
         morale:{type:GraphQLInt},
         breedcount:{type:GraphQLInt},

        
        },
         async resolve(parent, args){
             try{
                let editedSpawn = await Spawns.update(args,{
                    where:{id:args.id},
                    returning:true
                })
                let resultedSpawn = await Spawns.findOne({
                    where:{id:args.id}
                })
                return resultedSpawn.dataValues
                }
            catch(err){
                throw new console.error(err);
                return {}
            }
        }
     },

     deleteSpawn:{
        type:SpawnType,
        args:{id:{type:GraphQLInt},
       },
       async resolve(parent, args){
           try{
                const fetchOne = await Spawns.findOne({
                    where:{id:args.id}
                })
                const statId = fetchOne.dataValues.statsid
                const deletedSpawn = await Spawns.destroy({
                    where:{id:args.id}
                })
                const deleteStats = await Stats.destroy({
                    where:{id:statId}
                })
            return fetchOne.dataValues
            }
       
       catch(err){
        throw new console.error(err);
        return {}
            }
        }
    },

      deleteAllSpawns:{
        type:SpawnType,
       
       async resolve(parent, args){
           
           return "deletedSpawn"
        }
      },


    //   User mutation

    createUser:{
        type:UserType,
        args:{id:{type:GraphQLID},
        name:{type:GraphQLString},
        image:{type:GraphQLString},
        parents:{type: new GraphQLList(GraphQLID)},
        price:{type:GraphQLFloat},
        priceCrypto:{type:GraphQLFloat},
        health:{type:GraphQLInt},
        speed:{type:GraphQLInt},
        color:{type:GraphQLString},
        skill:{type:GraphQLInt},
        breedCount:{type:GraphQLInt},
        morale:{type:GraphQLInt},
        class:{type:GraphQLString},

        subClass:{type:GraphQLString},

    },
    resolve(parent, args){
        // let newSpawn = new Spawns(
        //     args
        // )

        return "newSpawn.save()"
    }
 },

 editUser:{
     type: UserType,
     args:{id:{type:GraphQLID},
        name:{type:GraphQLString},
        image:{type:GraphQLString},
        parents:{type: new GraphQLList(GraphQLID)},
        price:{type:GraphQLFloat},
        priceCrypto:{type:GraphQLFloat},
        health:{type:GraphQLInt},
        speed:{type:GraphQLInt},
        skill:{type:GraphQLInt},
        morale:{type:GraphQLInt},
        color:{type:GraphQLString},
        breedCount:{type:GraphQLInt},
        class:{type:GraphQLString},
        subClass:{type:GraphQLString},

    
    },
     resolve(parent, args){
        //  let editedSpawn = Spawns.findOneAndUpdate({_id:args.id},args, {new:true})
        return "editedSpawn"
     }
 },

 deleteUser:{
    type:UserType,
    args:{id:{type:GraphQLID},
   },
   async resolve(parent, args){
        
       return "deletedSpawn"
    }
  },

  deleteAllUsers:{
    type:UserType,
   
   async resolve(parent, args){
        
       return "deletedSpawn"
    }
  },

  user:{
    type:SpawnType,
    args:{id:{type:GraphQLID}},
    resolve(parents, args){
        return "Spawns.findById(args.id)"
            }

        },
    }
})

module.exports = new GraphQLSchema({
    query:RootQueryType,
    mutation:Mutation
})


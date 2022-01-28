const graphql = require('graphql')
const Spawns = require('../models/spawns')
const {GraphQLObjectType,GraphQLSchema, GraphQLFloat, GraphQLInt, GraphQLID, GraphQLBoolean, GraphQLList, GraphQLString} = graphql


const SpawnType = new GraphQLObjectType({
    name:"Spawn",
    fields: () =>({
            id:{type:GraphQLID},
            name:{type:GraphQLString},
            image:{type:GraphQLString},
            parents:{type: new GraphQLList(GraphQLID)},
            spawns:{type:new GraphQLList(SpawnType),
                    resolve(parent){
                        console.log("WWHATSA")
                        console.log(parent.parents)
                        return Spawns.find({_id:{$in:parent.parents}})
                    }},
            price:{type:GraphQLFloat},
            priceCrypto:{type:GraphQLFloat},
            health:{type:GraphQLInt},
            speed:{type:GraphQLInt},
            skill:{type:GraphQLInt},
            color:{type:GraphQLString},
            morale:{type:GraphQLInt},
            class:{type:GraphQLString},
            subClass:{type:GraphQLString},
            breedCount:{type:GraphQLInt},
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
            resolve(parents){
                return Spawns.find()
            }

        },

        spawn:{
            type:SpawnType,
            args:{id:{type:GraphQLID}},
            resolve(parents, args){
                console.log(args)
                return Spawns.findById(args.id)
            }

        },

        users:{
            type:new GraphQLList(SpawnType),
            resolve(parents){
                return Spawns.find()
            }

        },

        user:{
            type:SpawnType,
            args:{id:{type:GraphQLID}},
            resolve(parents, args){
                console.log(args)
                return Spawns.findById(args.id)
            }

        }
    }
})

const Mutation = new GraphQLObjectType({
    name:"Mutation", 
    fields:{
        createSpawn:{
            type:SpawnType,
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
            let newSpawn = new Spawns(
                args
            )

            return newSpawn.save()
        }
     },

     editSpawn:{
         type:SpawnType,
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
             let editedSpawn = Spawns.findOneAndUpdate({_id:args.id},args, {new:true})
            return editedSpawn
         }
     },

     deleteSpawn:{
        type:SpawnType,
        args:{id:{type:GraphQLID},
       },
       async resolve(parent, args){
            let deletedSpawn = await Spawns.findOneAndRemove({_id:args.id})
            console.log(deletedSpawn)
           return deletedSpawn
        }
      },

      deleteAllSpawns:{
        type:SpawnType,
       
       async resolve(parent, args){
            let deletedSpawn = await Spawns.deleteMany()
            console.log(deletedSpawn)
           return deletedSpawn
        }
      },

      spawn:{
        type:SpawnType,
        args:{id:{type:GraphQLID}},
        resolve(parents, args){
            console.log(args)
            return Spawns.findById(args.id)
        }

    }
    }
})

module.exports = new GraphQLSchema({
    query:RootQueryType,
    mutation:Mutation
})


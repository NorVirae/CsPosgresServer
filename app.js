const express = require('express');
const cors = require('cors');
const Pool = require('./db');

const app = express()


app.use(cors())
app.use(express.json())


app.get("/", (req, res)=>{
    res.json({msg:"connection was successful!"})
})

app.post("/create/spawn", async(req, res)=> {


    try{
        console.log(req.body)
        const data = req.body
        const newSpawn = await Pool.query(`INSERT INTO spawns(spawnid, ownerid, birthdate, chain, level, class, name, parts, breedcount) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
         [data.spawnid, data.ownerid, data.birthdate, data.chain, data.level, data.class, data.name, data.parts, data.breedcount])
        res.send({data:newSpawn,msg: "CHECK HERE"})

    }catch(err){

        console.log(err)
        res.send(err)

    }
})


const port = process.env.PORT || 4000

app.listen(port, ()=>{
    console.log("connection successful on port: "+port)
})
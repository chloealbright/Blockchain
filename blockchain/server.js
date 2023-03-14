const express = require('express');
const cors = require('cors');
const Blockchain = require('./firebase.config');
const app = express();
app.use(express.json());
app.use(cors());


app.post("/create", async (req,res)=>{
    const data = req.body;
    console.log("Data of Blockchain " + data);
    await Blockchain.add(data);
    res.send({msg: "Block added"});
}) 

app.listen(4000, ()=> console.log("Server is running on port 4000"));


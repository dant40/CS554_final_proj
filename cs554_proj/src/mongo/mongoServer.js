const accounts = require("./accounts")
const express = require("express");
const app = express();

app.get("/api/create", async (req, res) => {
    try{
     const acc = await accounts.create("testy","mctesterson")
    }
    catch(e){
        return res.json({error:e})
    }
    return res.json(acc)
    
 });

app.listen(3001, () => {
    console.log("Mongo Server Going Up");
    console.log("Your routes will be running on http://localhost:3001");
  });
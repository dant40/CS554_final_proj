const accounts = require("./accounts")
const express = require("express");
const app = express();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const jimp = require('jimp');
const mongoCollections = require("./collection");
const photos = mongoCollections.photos;


// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images');
  },
  filename: function (req, file, cb) {
    cb(null, "image" +  path.extname(file.originalname));
  }
});

var upload = multer({ storage: storage });
app.use(express.json())
//in the essence of time, these mongo routes are just wrappers and don't do
//much error checking, they expect things to be well formed
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader( "Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    next();
  });

app.post("/api/create", async (req, res) => {
    var acc= {"formatting issue" :"your json was bad!"};
    try{
        //if no password, assume its a google login      
        const body = req.body;
        if(body.username && body.password){
            console.log("creating non google")
             acc = await accounts.create(body.username, body.password);
        }
        else if(body.username)  acc = await accounts.createFromGoogleLogin(body.username);
    }
    catch(e){
        console.log(e)
        return res.status(400).json({error: e})
    }
    return res.json(acc)
    
});

app.post("/api/login", async (req, res) => {
    var acc={"formatting issue" :"your json was bad!"};
    try{
        const body = req.body;
        if(body.username && body.password){
            console.log("logging in")
             acc = await accounts.login(body.username,body.password)
        }
    }catch(e){
        console.log(e)
        return res.status(400).json({error: e})
    }

    return res.json(acc)
})

app.post("/api/get", async (req,res) => {
    var acc = {"formatting issue" :"your json was bad!"};
    try{
        const body = req.body;
        if(body.username){
             acc = await accounts.get(body.username)
             //console.log(acc)
        }
    }catch(e){
        console.log(e)
        return res.status(400).json({error: e})
    }

    return res.json(acc)
})

app.post("/api/getSearch", async (req,res) => {
    var acc = {};
    try{
        const body = req.body;
        if(body.searchTerm) acc = await accounts.getSearch(body.searchTerm)           
        
    }catch(e){
        console.log(e)
        return res.status(400).json({error: e})
    }

    return res.json(acc)
})


app.post("/api/changeUsername", async (req,res) => {
    var acc ={"formatting issue" :"your json was bad!"};
    try{
        const body = req.body;
        if(body.username && body.newUsername && body.password){
             acc = await accounts.changeUsername(body.username,body.newUsername,body.password)
             console.log(acc)
        }
    }catch(e){
        console.log(e)
        return res.status(400).json({error: e})
    }

    return res.json(acc)
})

app.post("/api/changePassword", async (req,res) => {
    var acc ={"formatting issue" :"your json was bad!"};
    try{
        const body = req.body;
        if(body.username && body.newPassword && body.password){
             acc = await accounts.changePassword(body.password,body.newPassword,body.username)
             console.log(acc)
        }
    }catch(e){
        console.log(e)
        return res.status(400).json({error: e})
    }

    return res.json(acc)
})

app.post("/api/addFriend", async (req,res) => {
    var acc ={"formatting issue" :"your json was bad!"};
    try{
        const body = req.body;
        if(body.username && body.friendName){
             acc = await accounts.addFriend(body.username,body.friendName)
             console.log(acc)
        }
    }catch(e){
        console.log(e)
        return res.status(400).json({error: e})
    }

    return res.json(acc)
})

app.post("/api/removeFriend", async (req,res) => {
    var acc ={"Formatting issue" :"your json was bad!"};
    try{
        const body = req.body;
        if(body.username && body.friendName){
             
             acc = await accounts.removeFriend(body.username,body.friendName)
            
        }
    }catch(e){
        console.log(e)
        return res.status(400).json({error: e})
    }

    return res.json(acc)
})

app.post("/api/save", async (req,res) => {
    var acc ={"Formatting issue" :"your json was bad!"};
    try{
        const body = req.body;
        if(body.username && body.score){        
             acc = await accounts.updateScore(body.username,body.score)
        }
    }catch(e){
        console.log(e)
        return res.status(400).json({error: e})
    }

    return res.json(acc)
})

app.post("/api/updateScore", async(req,res) =>{
    var acc ={"Formatting issue" :"your json was bad!"};
    try{
        const body = req.body;
        if(body.username && body.score){
             acc = await accounts.updateScore(body.username,body.score)
             console.log(acc)
        }
    }catch(e){
        console.log(e)
        return res.status(400).json({error: e})
    }
    return res.json(acc)
})

// @route GET /
// @desc Loads form
app.get("/api/getPhoto", async function (req,res){
  var acc ={"Formatting issue" :"your json was bad!"};
    try{
        const body = req.body;
        if(body.username){
             url = await accounts.getPhoto(body.username);
             var photosCollection = await photos();
             acc = await photosCollection.findOne({filepath: url});
             //console.log(acc)
        }
    }catch(e){
        console.log(e)
        return res.status(400).json({error: e})
    }
    return res.json(acc)
})

app.post('/api/uploadNewPhoto', upload.single('image'), async (req, res) => {
  var img = fs.readFileSync(req.file.path);
  var encode_image = img.toString('base64');
  // Define a JSONobject for the image attributes for saving to database
  
  var finalImg = {
    contentType: req.file.mimetype,
    image:  new Buffer.from(encode_image, 'base64'),
    name: req.body.username,
    description: req.body.username + " profile photo",
    filepath: "public/images/" + req.body.username + ".jpg"
  };

  var changeName = await jimp.read("public/images/image.jpg");
  changeName.write(finalImg.filepath);

  var photosCollection = await photos();
  var insert = await photosCollection.insertOne(finalImg);
  if(insert.insertedCount == 0){
      throw new Error("account cannot be created")
  }
  var pfp = await accounts.uploadNewPhoto(req.body.username, finalImg.filepath);
  return pfp;
});

app.get("/*", async (req,res) => {
    return res.status(404).json({error: "nice try kiddo"})
});

app.listen(3001, () => {
    console.log("Mongo Server Going Up");
    console.log("Your routes will be running on http://localhost:3001");
  });
const express = require("express");
const app = express();
const cors = require("cors");

require("./db/config");
const User = require("./db/user");
const File = require("./db/pdf");

const fs = require("fs");
const path = require("path");

const multer = require("multer");

app.use(express.json());
app.use(cors());

const jwt =require("jsonwebtoken");
const jwtKey = 'library';

//Sign_up_api

app.post("/signup", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  jwt.sign({result},jwtKey,{expiresIn:'2h'},(err,token)=>{
        if(err){
          resp.send("user not found");
        }else{
            resp.send({result,auth:token});
        }
      })
});

//Log_in_api

app.post("/login", async (req, resp) => {
  console.log(req.body);
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      jwt.sign({user},jwtKey,{expiresIn:'2h'},(err,token)=>{
        if(err){
          resp.send("user not found");
        }else{
            resp.send({user,auth:token});
        }
      })
    } else {
      resp.status(404).send({ message: "User Not Found" });
    }
  } else {
    resp.status(404).send({ message: "Enter valid fild" });
  }
});

//Upload_api_dierect_to_upload_folder

const storage = multer.diskStorage({
  destination: path.join(__dirname, "uploads"),
  filename: function (req, file, cb) {
    // Rename the file with its original name
    cb(null, file.originalname);
  },
});

// Set up multer with the storage configuration
const upload = multer({ storage });

//Upload_to_the_Server

app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    const { originalname, path } = req.file;

    // Save the file to MongoDB
    const file = new File({ name: originalname, path: path });
    await file.save();

    res.json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading file" });
  }
});

//get_files_from_upload_folder_api

app.get("/api/files", (req, res) => {
  const uploadsFolder = path.join(__dirname, "uploads");

  fs.readdir(uploadsFolder, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading files");
    } else {
      const pdfFiles = files.filter((file) => path.extname(file) === ".pdf");
      const fileData = [];

      pdfFiles.forEach((file) => {
        const filePath = path.join(uploadsFolder, file);
        const data = fs.readFileSync(filePath);

        fileData.push({
          name: file,
          data: data.toString("base64"),
        });
      });

      res.json(fileData);
    }
  });
});


//Search_api
app.get('/search/:key',async(req,resp)=>{
    let result = await File.find({
      "$or":[
        {name:{$regex:req.params.key}}
      ]
    })
    resp.send(result);
})

// circket
const apiKey = 'drPPlb9kd3stHpEMf8SSBSww4Une5IUaQFcL0OtrGqLPMOIHyNo78I20LvGNKniY'; // Replace with your Football Data API key

app.get('/api/live-scores', async (req, res) => {
    try {
        const response = await axios.get('https://api.football-data.org/v2/matches', {
            headers: {
                'X-Auth-Token': apiKey,
            },
            params: {
                status: 'LIVE', // Get live matches
            },
        });

        const liveScores = response.data.matches;
        res.json(liveScores);
    } catch (error) {
        console.error('Error fetching live scores:', error);
        res.status(500).json({ error: 'An error occurred while fetching live scores.' });
    }
});


app.listen(5000);

//framework config

const express=require("express");
const connectDb=require("./config/dbConnection");
const errorHandler = require("./middlewares/errorhandler");
const cors= require("cors");
const hbs = require("hbs");
const path = require("path");
const multer = require('multer');

//const upload = multer({dest: 'uploads/'});
// const fs = require("fs");
//disk storage

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, "uploads");
  },
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
      // const extension = path.extname(file.originalname);
      cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });
///ENV FILE CONFIG

const dotenv = require("dotenv");
dotenv.config(); //enabling env file ki env file ko script se attatch kr ske


connectDb(); //jo service bnyi h use  call kra h 
const app=express();
const port=process.env.PORT || 5000; //env file me port nam k var create kr usmei port no dere h || env ke through sari config pass krni h 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.set('view engine','hbs');
app.use(express.json());
app.use(cors());
hbs.registerPartials(path.join(__dirname, '/views/partials'))
// Route for user registration and authetication
app.use("/api/",require("./routes/userRoutes"));
app.use("/api/details",require("./routes/doctorDetails"));

//error handling middleware

app.use(errorHandler);
let imageUrls = [];
//routes below 

app.get('/',(req,res) => {
    res.send("working");
});

app.get("/home",(req,res)=>{
    res.render("home",{username: "pari" })
})

app.get("/users",(req,res)=>{
    res.render("users",{age: "user age is 20" , address: "3131"

    })
})

app.get("/allusers",(req,res)=>{
    res.render("users",{
        users:[{id:1,username:"nitesh",age:23},
            {id:1,username:"anket",age:24}
        ]})
})



app.post('/profile', upload.single('avatar'), function (req, res, next) {
  if(!req.file){
    return res.status(400).json("no file uploaded");
  }
    console.log(req.body);
    console.log(req.file);
    const fileName = req.file.filename;
    const imageUrl = `/uploads/${fileName}`;
    imageUrls.push(imageUrl);
    res.render("allimages",{
      imageUrls: imageUrls
    })
    
  });

  app.get("/allimages", (req, res) => {
    app.get("/allimages", (req, res) => {
      const imageUrls = []; 
      res.render("images", { imageUrls: imageUrls }); 
  });
  });

  
app.listen(port,() =>{
  console.log(`server running on port http://localhost:${port}`);
});

  
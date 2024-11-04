//framework config

const express=require("express");
const connectDb=require("./config/dbConnection");
const errorHandler = require("./middlewares/errorhandler");
const cors= require("cors");
const hbs = require("hbs");
const path = require("path");

///ENV FILE CONFIG

const dotenv = require("dotenv");
dotenv.config(); //enabling env file ki env file ko script se attatch kr ske

connectDb(); //jo service bnyi h use  call kra h 
const app=express();
const port=process.env.PORT || 5000; //env file me port nam k var create kr usmei port no dere h || env ke through sari config pass krni h 

app.use(express.json());
app.use(cors());

// Route for user registration and authetication
app.use("/api/",require("./routes/userRoutes"));

//error handling middleware

app.use(errorHandler);

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

hbs.registerPartials(path.join(__dirname, '/views/partials'));



//app config start

app.listen(port,() =>{
    console.log(`server running on port http://localhost:${port}`);
});

app.set('view engine','hbs');
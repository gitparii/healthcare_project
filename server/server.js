//framework config

const express=require("express");
const connectDb=require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const cors= require("cors");

///ENV FILE CONFIG

const dotenv = require("dotenv");
dotenv.config(); //enabling env file ki env file ko script se attatch kr ske

connectDb(); //jo service bnyi h use  call kra h 
const app=express();
const port=process.env.PORT || 5000; //env file me port nam k var create kr usmei port no dere h || env ke through sari config pass krni h 

app.use(express.json());
app.use(cors());

//error handling middleware

app.use(errorHandler);

//routes below 

app.get('/',(req,res) => {
    res.send("working");
});

//app config start

app.listen(port,() =>{
    console.log(`server running on port http://localhost:${port}`);
});

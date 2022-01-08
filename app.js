const express=require("express");

const mongoose = require("mongoose");

const app= express();

const cookieParser= require('cookie-parser');

require("dotenv").config();

const port=  5000;

app.use(cookieParser()); // I was missing this code!!!! which didnt
//let me- continue making notes on this code i was missing
app.use(express.json());

const uri= process.env.ATLAS_URI;

mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:true},()=>{
  console.log("MongoDB database connected successfully");
})


const userRouter = require('./routes/User');
const badhandRouter=require('./routes/BadHandRoutes');
const mirrorRouter= require('./routes/MirrorRoutes');
const callousedMindRouter = require('./routes/CallousedMindRoutes');
const takingSoulsRouter = require('./routes/TakingSoulsRoutes');
const armoredMindRouter = require ('./routes/ArmoredMindRoutes');
const cookieJarRouter=require('./routes/CookieJarRoutes');
const fortyPercentRouter=require('./routes/FortyPercentRoutes');
const scheduleRouter=require('./routes/ScheduleRoute');;

 app.use('/user', userRouter);
 app.use('/user/badhand', badhandRouter);
 app.use('/user/mirror', mirrorRouter);
 app.use('/user/calloused', callousedMindRouter);
app.use('/user/takingSouls',takingSoulsRouter);
app.use('/user/armoredMind',armoredMindRouter);
app.use('/user/cookieJar',cookieJarRouter);
app.use('/user/fortyPercentRule',fortyPercentRouter);
app.use('/user/schedule',scheduleRouter);
 //lets test our badhand without /user as an experiment to see if it would still work or break

app.listen(port,function(){
  console.log(`server is on port ${port}`);
})

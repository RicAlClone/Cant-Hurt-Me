const express=require("express");

const mongoose = require("mongoose");

const app= express();

const cookieParser= require('cookie-parser');

require("dotenv").config();

const PORT= process.env.PORT || 5000;

app.use(cookieParser()); // I was missing this code!!!! which didnt
//let me- continue making notes on this code i was missing
// app.use(express.json());//dont know if i would need this since its also used at line 17.

app.use(express.json({limit: '50mb',extended:true}));
app.use(express.urlencoded({limit: '50mb',extended:true}));

const uri= process.env.ATLAS_URI;

mongoose.connect(process.env.MONGODB_URI || uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:true},()=>{
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
const scheduleRouter=require('./routes/ScheduleRoute');
const uncommonRouter=require('./routes/UncommonRoutes');
const failureRouter=require('./routes/FailureRoutes');

 app.use('/user', userRouter);
 app.use('/user/badhand', badhandRouter);
 app.use('/user/mirror', mirrorRouter);
 app.use('/user/calloused', callousedMindRouter);
app.use('/user/takingSouls',takingSoulsRouter);
app.use('/user/armoredMind',armoredMindRouter);
app.use('/user/cookieJar',cookieJarRouter);
app.use('/user/fortyPercentRule',fortyPercentRouter);
app.use('/user/schedule',scheduleRouter);
app.use('/user/uncommon',uncommonRouter);
app.use('/user/failure',failureRouter);


if(process.env.NODE_ENV=== 'production'){
  app.use(express.static('client/build'));
}

app.listen(port,function(){
  console.log(`server is on port ${PORT}`);
})

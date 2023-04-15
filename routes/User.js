const express= require('express');

const userRouter= express.Router();

const passport = require('passport');

const passportConfig = require('../passport');

const User = require('../models/User');

const Badhand = require('../models/Badhand');

const DayModel= require('../models/Schedule.model');
const skeleton = require('../models/Skeleton');

const allDays=require("./AllDays");

const app=express();

const cookieSession = require('cookie-session');
require('../passport');

const JWT = require('jsonwebtoken');

//jwt will be made with secret_key. Our server checks that secret_key is still
//inside jwt to make sure no one tampered with it.
const signToken = userID =>{
  return JWT.sign({
    iss: process.env.SECRET_KEY,
    sub: userID
},process.env.SECRET_KEY, {expiresIn : "24h"} );
};


userRouter.post('/register',(req,res)=>{
  const {username,password}=req.body;
  User.findOne({username},(err, foundUser)=>{
    if(err){
      res.status(500).json({message:{msgBody:"error has occured",msgError:true}});
    }
    if(foundUser){
      res.status(400).json({message:{msgBody:"Username is already taken",msgError:true}});
    }
    else{
      //Create a new User via mongoose
      const newUser= new User({username,password});

    newUser.save((err,result)=>{
    
      if(err){
        //We get 3 different types of errors when registering
        if(err.errors['username']&&err.errors['password']){
          res.status(500).json({message:{msgBody:"Username should be 6 character or more. Password should be 8 characters or more",msgError:true}})
        }
        else if(err.errors['username']){
          res.status(500).json({message:{msgBody:err.errors['username'].message,msgError:true}})
        }
        else if(err.errors['password']){
          res.status(500).json({message:{msgBody:err.errors['password'].message,msgError:true}})
        }

      }
      else{

        res.status(201).json({message:{msgBody:"account successfully created",msgError:false}});
        //creates our schedule time blocks
        allDays.everyDayFunction(DayModel,skeleton,result);

      }
     });
    };
  });

});


userRouter.post('/login', passport.authenticate('local',{session:false}),(req,res)=>{
  if(req.isAuthenticated()){
    const {_id, username}= req.user;
//this function will be invoked. Check line 25.
//this token will be signed and the jwt will be created.
    const token = signToken(_id);

    res.cookie('access_token',token,{httpOnly:true, sameSite:true});

    res.status(200).json({isAuthenticated: true, user: {username}});

  }

});

userRouter.get('/logout', passport.authenticate('jwt', {session : false}), (req,res)=>{
  res.clearCookie('access_token');
  res.json({ user: { username : " "}, success: true});
});


userRouter.get('/authenticated', passport.authenticate('jwt', {session : false}), (req,res)=>{
  console.log('authenticated route');
  const {username}= req.user;
  res.status(200).json({isAuthenticated : true, user:{username}});

});




module.exports = userRouter;

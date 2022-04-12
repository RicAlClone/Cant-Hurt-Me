const express= require('express');

const userRouter= express.Router();

const passport = require('passport');

const passportConfig = require('../passport');

const User = require('../models/User');// i uncapped the user here 5-5-2021 to test.

const Badhand = require('../models/Badhand');

const DayModel= require('../models/Schedule.model');
const skeleton = require('../models/Skeleton');

const allDays=require("./AllDays");

const app=express();

const cookieSession = require('cookie-session');
require('../passport');

const JWT = require('jsonwebtoken');

const signToken = userID =>{

  return JWT.sign({

    iss: process.env.SECRET_KEY,
    //who is this jwt token for
    sub: userID
    //the second argument is the key that you want to sign with
    //when you sign you are creating the jwt token
    //has to match secretOrKey to verify the token is legit
// expiresIn is an option
},process.env.SECRET_KEY, {expiresIn : "24h"} );
};



userRouter.post('/register',(req,res)=>{
  const {username,password}=req.body;
  User.findOne({username},(err, foundUser)=>{ //arrow function
    if(err){
      res.status(500).json({message:{msgBody:"error has occured 1",msgError:true}});
    }
    if(foundUser){
      res.status(400).json({message:{msgBody:"Username is already taken",msgError:true}});
    }
    else{

      const newUser= new User({username,password});

    newUser.save((err,result)=>{ ///arrow
      if(err){

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

        allDays.everyDayFunction(DayModel,skeleton,result);

      }
     });
    };//else statement closes.
  });

});


userRouter.post('/login', passport.authenticate('local',{session:false}),(req,res)=>{

  if(req.isAuthenticated()){
    const {_id, username}= req.user;

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
  const {username}= req.user;
  res.status(200).json({isAuthenticated : true, user:{username}});

});




module.exports = userRouter;

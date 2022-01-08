
const express = require('express');
const passport = require('passport');
const router=express.Router();
const User =require('../models/User');
const Schedule = require('../models/Schedule.model');


router.get('/scheduleGetDays',passport.authenticate('jwt', { session: false }),(req,res)=>{
  //i want to be able to get monday and tuesWeek1
  //i need to use populate. I have to populate the array in User.dayModel.This will somehow bring back
  //all id objects related to this User. Once we bring that back we can update everyting in Schedule model.
  const userId=req.user._id;
  console.log(userId);
  //we find user. how will we insert the specific ids that are connected to it that are in Schedule collective.
  //are they suppose to be there already.

  //forgot {} around _id
  //forgot document was our whole user so we need to enter documents.dayModel
  //the anser doesnt fully explain to me how populate finds the matching _ids and populates.
  User.findById({_id:userId}).populate('dayModel').exec((err,documents)=>{
    if(err){
      res.status(500).json({message:{msgBody:'error occurred',msgError:true}});
    }
    else{
      //so we are getting back all docs from this User. Will monday week 1 be returned as well? Yes it
      //would but so will the rest of docs. is that bad? not exactly but the program is doing more work bringing
      //the rest everytime.

      res.status(200).json({message:{documents:documents.dayModel,msgError:false}});
    }
  })
});

router.put('/dayUpdate/:id',passport.authenticate('jwt', { session: false }),(req,res)=>{
  const id=req.params.id;
  const sentOver=req.body;

console.log(sentOver);
//so our findOneAndReplace doesnt send back the new replacement but we dont need it because
//we can use /get
Schedule.findOneAndReplace({_id:id},sentOver,{},(err)=>{
  if(err){
    console.log(err);
    // res.status(500).json({message:{msgBody:"error ocurred",msgError:true}})
  }
  else{
    res.status(200).json({message:{msgBody:"saved day",msgError:false}});

  }
})
});

module.exports=router;

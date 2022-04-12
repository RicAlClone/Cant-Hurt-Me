
const express = require('express');
const passport = require('passport');
const router=express.Router();
const User =require('../models/User');
const Schedule = require('../models/Schedule.model');


router.get('/scheduleGetDays',passport.authenticate('jwt', { session: false }),(req,res)=>{

  const userId=req.user._id;

  User.findById({_id:userId}).populate('dayModel').exec((err,documents)=>{
    if(err){
      res.status(500).json({message:{msgBody:'error occurred',msgError:true}});
    }
    else{
          res.status(200).json({message:{documents:documents.dayModel,msgError:false}});
    }
  })
});

router.put('/dayUpdate/:id',passport.authenticate('jwt', { session: false }),(req,res)=>{
  const id=req.params.id;
  const sentOver=req.body;


Schedule.findOneAndReplace({_id:id},sentOver,{},(err)=>{
  if(err){
    
    res.status(500).json({message:{msgBody:'error occurred',msgError:true}});
  }
  else{
    res.status(200).json({message:{msgBody:"saved day",msgError:false}});

  }
})
});

module.exports=router;

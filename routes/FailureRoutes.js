const express= require('express');
const passport= require('passport');
const router= express.Router();
const User =require("../models/User");
const Failure=require("../models/Failure.model");

//post
router.post('/postFailureNote',passport.authenticate('jwt', { session: false }),(req,res)=>{

  const newFailureNote= new Failure(req.body);
  newFailureNote.save((err,saved)=>{
    if(err){

      res.status(500).json({message:{msgBody:"Error occurred",msgError:true}})
    }
    else{

      req.user.failure.push(saved);
      req.user.save(err=>{
        if(err){
          res.status(500).json({message:{msgBody:"Error occurred ❕",msgError:true}})
        }
        else{
          res.status(200).json({message:{msgBody:"saved note ✔",msgError:false}})
        }
      })
    }
  })
})


//get
router.get('/getFailureNotes',passport.authenticate('jwt', { session: false }),(req,res)=>{
  User.findById(req.user._id).populate("failure").exec((err,docs)=>{
    if(err){
      res.status(500).json({message:{msgbody:"error occured",msgError:true}})
    }
    else{
      res.status(200).json({message:{documents:docs.failure,msgError:false}})
    }
  })
})

//delete
router.delete('/deleteFailureNote/:id',passport.authenticate('jwt', { session: false }),(req,res)=>{
const id=req.params.id;
  User.findByIdAndUpdate(req.user._id,{$pull:{failure:id}},(err,temp)=>{
    if(err){
      res.status(500).json({message:{msgBody:"error",msgError:true}})
    }
    else{
      Failure.findByIdAndDelete(id,(err,deleted)=>{
        if(err){
          res.status(500).json({message:{msgBody:"error ❕",msgError:true}})
        }
        else{
          res.status(200).json({message:{msgBody:"deleted note ✖",msgError:false}})
        }
      })
    }
  })
})

module.exports=router;

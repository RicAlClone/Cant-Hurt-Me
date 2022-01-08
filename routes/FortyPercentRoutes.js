const express = require('express');

// const app=express();

const User = require('../models/User');
const passport = require('passport');

const fortyPercentRule = require('../models/40PercentRule.model.js');

const router = express.Router();

router.post('/postRuleNote', passport.authenticate('jwt', {session: false}), (req, res) => {
  //we need to get our req.body which is formData
  const data = req.body;
  console.log(data,'is our req.body');
  const newPercentRule = new fortyPercentRule(data);
  newPercentRule.save((err, saved) => {
    if (err) {
      res.status(500).json({
        message: {
          msgBody: "not saved,error occured",
          msgError: true
        }
      });
    } else {
      req.user.fortyPercentRule.push(saved);
      req.user.save((err) => {
        if (err) {
          res.status(500).json({message: {msgBody: "not saved,error occured",msgError: true}});

        } else {
          res.status(200).json({message: {msgBody: "saved",msgError: false}})
        }
      })
    }
  })
})

router.get('/getRuleNotes',passport.authenticate('jwt', {session: false}),(req,res)=>{

  User.findById({_id:req.user._id}).populate('fortyPercentRule').exec((err,posts)=>{
    if(err){
      res.status(500).json({message:{msgBody:"not found",msgError:true}});
    }else{
      res.status(200).json({fortyPercentRules:posts.fortyPercentRule,authenticated:true})
    }
  })
})

router.delete('/deleteRuleNote/:id',passport.authenticate('jwt', {session: false}),(req,res)=>{
  //what do we need to do? i need to find by model then delete that id
  const idParams=req.params.id;

User.findOneAndUpdate({_id:req.user._id},{"$pull":{"fortyPercentRule":idParams}},{ safe: true, multi:true },(err,deleted)=>{
  if(err){
    console.log(err);
    res.status(500).json({message:{msgBody:"not found,first",msgError:true}});
  }
  else{
    fortyPercentRule.findByIdAndDelete({_id:idParams},(err)=>{
      if(err){
        res.status(500).json({message:{msgBody:"not found,second",msgError:true}});
      }
      else{
        res.status(200).json({message:{msgBody:"deleted",msgError:false}});
      }
    })
  }
})


})
//we make note
//we increase reps.That makes an update on that specific model,on the specific id of note.
//i see findOneAndReplace which we can use to replace the whole doc.
//to do that we would have to pass in id like our delete route.


router.put('/updateRuleNote/:id',passport.authenticate('jwt', {session: false}),(req,res)=>{
  //we would send over a req.body.formData;
  const id=req.params.id;

  //what if when we create a new user we create all models for our days in
  console.log(req.body,'this is req.body');
  fortyPercentRule.findOneAndReplace({_id:id},req.body,{},(err,result)=>{
    if(err){
      res.status(500).json({message:{msgBody:"not found",msgError:true}});
    }
    else{
      console.log(result);
      res.status(200).json({message:{msgBody:"updated",msgError:false}});
    }
  })
})



module.exports = router;

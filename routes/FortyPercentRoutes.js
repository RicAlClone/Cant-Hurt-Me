const express = require('express');

const User = require('../models/User');

const passport = require('passport');

const fortyPercentRule = require('../models/40PercentRule.model.js');

const router = express.Router();

router.post('/postRuleNote', passport.authenticate('jwt', {session: false}), (req, res) => {

  const data = req.body;

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
          res.status(500).json({message: {msgBody: "not saved,error occured ❕",msgError: true}});

        } else {
          res.status(200).json({message: {msgBody: "saved ✔",msgError: false}})
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

  const idParams=req.params.id;

User.findOneAndUpdate({_id:req.user._id},{"$pull":{"fortyPercentRule":idParams}},{ safe: true, multi:true },(err,deleted)=>{
  if(err){

    res.status(500).json({message:{msgBody:"not found,first",msgError:true}});
  }
  else{
    fortyPercentRule.findByIdAndDelete({_id:idParams},(err)=>{
      if(err){
        res.status(500).json({message:{msgBody:"not found,second ❕",msgError:true}});
      }
      else{
        res.status(200).json({message:{msgBody:"deleted ✖",msgError:false}});
      }
    })
  }
})


});


router.put('/updateRuleNote/:id',passport.authenticate('jwt', {session: false}),(req,res)=>{
  const id=req.params.id;

  fortyPercentRule.findOneAndReplace({_id:id},req.body,{},(err,result)=>{
    if(err){
      res.status(500).json({message:{msgBody:"not found ❕",msgError:true}});
    }
    else{
      res.status(200).json({message:{msgBody:"updated ✔",msgError:false}});
    }
  })
})



module.exports = router;

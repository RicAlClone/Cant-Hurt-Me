
var express=require('express');

var router= express.Router();

const passport = require('passport');

const passportConfig = require('../passport');

const User = require('../models/User');

const CallousedModel= require('../models/CallousedMind.model');



router.post('/postCallousedNote', passport.authenticate('jwt', { session: false }), function(req,res){

let reqBody=req.body;

let newModel= new CallousedModel(reqBody);

newModel.save(function(err,result){
  if(err){
        res.status(500).json({message:{msgBody:"error",msgError:true}});
  }else{
    req.user.calluses.push(result);
    req.user.save(function(err){
      if(err){
          res.status(500).json({message:{msgBody:"error ❕",msgError:true}});
      }else{
        res.status(200).json({message:{msgBody:"created callus note ✔",msgError:false}});
      }
    });
  }
})

})


router.get('/getCallousedNotes', passport.authenticate('jwt', { session: false }),function(req,res){

User.findById({_id:req.user._id}).populate('calluses').exec(function(err, document){
  if(err){
    res.status(500).json({message:{msgBody:"Error occured",msgError:true}});
  }else{
        res.status(200).json({calluses:document.calluses,authenticated:true});
  }
});

});


router.delete('/deleteCallusNote/:id', passport.authenticate('jwt', { session: false }),function(req,res){
let id=req.params.id;

CallousedModel.findByIdAndDelete({_id:id},function(err){
  if(err){
    res.status(500).json({message:{msgBody:"Error occured",msgError:true}});
  }else{
    User.updateOne({_id:req.user.id},{$pull:{calluses:id}},{multi:true},function(err){
      if(err){
        res.status(500).json({message:{msgBody:"Error occured ❕",msgError:true}});
      }else{
        res.status(200).json({message:{msgBody:"Callus note deleted ✖",msgError:false}});
      }
    })
  }
})


});

module.exports = router;

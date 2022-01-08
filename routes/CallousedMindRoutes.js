//what do we need to require?
  //express
  //make a name to make express.Router();

//require all the jwt and models.

var express=require('express');

var router= express.Router();

const passport = require('passport');

const passportConfig = require('../passport');

const User = require('../models/User');// i uncapped the user here 5-5-2021 to test.

const CallousedModel= require('../models/CallousedMind.model');

// first lets see if we can make a post

router.post('/postCallousedNote', passport.authenticate('jwt', { session: false }), function(req,res){
// new plan lets make a  new model to insert into our DB

let reqBody=req.body;


let newModel= new CallousedModel(reqBody);

newModel.save(function(err,result){
  if(err){
    console.log('this is the error ',err);
    res.status(500).json({message:{msgBody:" error has occured at 1st error check",msgError:true}});
  }else{
    req.user.calluses.push(result);
    req.user.save(function(err){
      if(err){
          res.status(500).json({message:{msgBody:" error has occured at at 2nd error check",msgError:true}});
      }else{
        res.status(200).json({message:{msgBody:"created callus note",msgError:false}});
      }
    });
  }
})

})

//lets make a get route
router.get('/getCallousedNotes', passport.authenticate('jwt', { session: false }),function(req,res){
  //what do we need to do to send back data
User.findById({_id:req.user._id}).populate('calluses').exec(function(err, document){
  if(err){
    res.status(500).json({message:{msgBody:"Error occured",msgError:true}});
  }else{
    console.log(document);
    res.status(200).json({calluses:document.calluses,authenticated:true});
  }
});

});

//build delete route
router.delete('/deleteCallusNote/:id', passport.authenticate('jwt', { session: false }),function(req,res){
let id=req.params.id;

CallousedModel.findByIdAndDelete({_id:id},function(err){
  if(err){
    res.status(500).json({message:{msgBody:"Error occured",msgError:true}});
  }else{
    User.updateOne({_id:req.user.id},{$pull:{calluses:id}},{multi:true},function(err){
      if(err){
        res.status(500).json({message:{msgBody:"Error occured",msgError:true}});
      }else{
        res.status(200).json({message:{msgBody:"Callus note deleted",msgError:false}});
      }
    })
  }
})



});

module.exports = router;

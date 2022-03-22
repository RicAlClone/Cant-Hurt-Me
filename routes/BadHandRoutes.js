const express= require('express');

const router= express.Router();

const passport = require('passport');

const passportConfig = require('../passport');

const User = require('../models/User');// i uncapped the user here 5-5-2021 to test.

const Badhand = require('../models/Badhand');


router.post('/postBadHand', passport.authenticate('jwt', {session : false}), (req,res)=>{
  const badhand= new Badhand(req.body);

  badhand.save(err=>{
    if(err){
      console.log(err);
      res.status(500).json({message:{msgBody:"empty, try again",msgError:true}});
    }
    else{ //what i didnt include was being able to push
      //our badhand onto our array of badhands. then we need
      //to save that badhand if there is an erro send err code
      //else we send res.status of 200 saying succesffully created
      req.user.badhands.push(badhand);
      //what we are doing is pushing our badhand onto badhands
      //but we are not able to save our user. At first i was saving
      //badhand again which is wrong because we wanted to save the user
      //because the user carries the array of badhands. My first attempt
      //i was trying to save at req which didnt get us anywhere because
      //what we needed was req.user . So when we save a badhand we want
      // to save the req.user.
      req.user.save(err=>{
        if(err){
          res.status(500).json({message:{msgbody:'2 error found',msgError:true}});
        }
        else{
          res.status(200).json({message:{msgBody : "Bad Hand added", msgError: false}});
        }
      })
    }
  })
});


router.get('/getBadHands',passport.authenticate('jwt', {session : false}), (req,res)=>{

  User.findById({_id:req.user._id}).populate('badhands').exec((err,document)=>{

    if(err){
      res.status(500).json({message:{msgBody:"error has occured",msgError:true}});
    }
    else{

      res.status(200).json({badhands: document.badhands, authenticated :true});
    }
  });
});


router.delete('/delete/:id',passport.authenticate('jwt', {session : false}), function (req,res){
  const id= req.params.id;

User.updateOne({_id:req.user.id},{"$pull":{"badhands":id}},{ safe: true, multi:true }, function(err, obj) {

if(err){
  res.status(500).json({message:{msgBody:"Unable to delete",msgError:true}});
}else{
  Badhand.findByIdAndDelete(id,function(err){
    if(err){
      res.status(500).json({message:{msgBody:"Unable to delete",msgError:true}});
    }else{
      res.status(200).json({message:{msgBody:'Deleted Bad Hand',msgError:false}})
    }
  })
}
})
})

module.exports = router;

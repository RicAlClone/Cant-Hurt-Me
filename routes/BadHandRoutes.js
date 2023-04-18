const express= require('express');

const router= express.Router();

const passport = require('passport');

const passportConfig = require('../passport');

const User = require('../models/User');

const Badhand = require('../models/Badhand');


router.post('/postBadHand', passport.authenticate('jwt', {session : false}), (req,res)=>{
  const badhand= new Badhand(req.body);

  badhand.save(err=>{
    if(err){
          res.status(500).json({message:{msgBody:"empty, try again ❕",msgError:true}});
    }
    else{
      req.user.badhands.push(badhand);

      req.user.save(err=>{
        if(err){
          res.status(500).json({message:{msgbody:'error try again ❕',msgError:true}});
        }
        else{
          res.status(200).json({message:{msgBody : "Bad Hand added ✔", msgError: false}});
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
      res.status(200).json({message:{msgBody:'Deleted Bad Hand ✖',msgError:false}})
    }
  })
}
})
})


module.exports = router;

const express= require('express');
const router = express.Router();
const passport = require('passport');
const TakingSoulNote = require('../models/TakingSouls.model');
//also include user to be able to use User
const User = require('../models/User');


router.post('/addTSNote',passport.authenticate('jwt', { session: false }),function(req,res){

const newNote= new TakingSoulNote({
  date:req.body.date,
  title:req.body.title,
  paragraph:req.body.paragraph
});

newNote.save(function(err,result){
  if(err){
    res.status(500).json({message:{msgBody:"Incomplete Note",msgError:true}})
  }else{
    req.user.takingSouls.push(result);
    req.user.save(function(err){
      if(err){
        res.status(500).json({message:{msgBody:"Error occured 2, please retry",msgError:true}})
      }else{
        res.status(200).json({message:{msgBody:"Taking Souls note saved",msgError:false}})
      }
    })
  }
})
});

router.get('/getTSNotes', passport.authenticate('jwt', { session: false }), function(req,res){
  //we need to get all notes from our collection
  User.findById({_id:req.user._id}).populate('takingSouls').exec((err,document)=>{
    if(err){
      res.status(500).json({message:{msgBody:"Error occured, please retry",msgError:true}})
    }else{
      console.log(document);
      res.status(200).json({takingSouls:document.takingSouls,authenticated:true});
    }
  });
});

router.delete('/deleteTSNotes/:id', passport.authenticate('jwt', { session: false }), function(req,res){
  const theParams= req.params.id;
// so on deleting an item we go into the model and remove but we also delete from the req.user.
//somehow we used update to delete by finding the id which one should i wrap first
  // either delete from model first and then from req.user.takingSouls or the opposite
  TakingSoulNote.findByIdAndDelete({_id:theParams},function(err){
    if(err){
      res.status(500).json({message:{msgBody:"Error occured , please retry",msgError:true}})
    }else{
      User.updateOne({_id:req.user._id},{$pull:{takingSouls:theParams}},function(err,result){
        if(err){
          res.status(500).json({message:{msgBody:"Error occured , please retry",msgError:true}})
        }else{
          res.status(200).json({message:{msgBody:"Taking Souls note deleted",msgError:false}})
        }
      });

    }
  });

});

module.exports = router;

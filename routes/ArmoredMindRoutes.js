
const express= require('express');
const router= express.Router();
const passport= require('passport');
const User = require('../models/User');
const ArmoredMindURL = require('../models/ArmoredMind.model');

router.post('/addArmoredNote',passport.authenticate('jwt', { session: false }),(req,res)=>{
  const sent = req.body.imageURL;

  const newArmoredNote= new ArmoredMindURL({
    imageURL: sent
  })
  newArmoredNote.save((err,saved)=>{
    if(err){
      res.status(500).json({message:{msgBody:"error occurred",msgError:true}});
    }else{

      req.user.armoredmindurls.push(saved);
      req.user.save((err)=>{
        if(err){
          res.status(500).json({message:{msgBody:"error occurred ❕",msgError:true}});
        }else{
          res.status(200).json({message:{msgBody:"Note added ✔",msgError:false}});
        }
      })

    }
  })

})

router.get('/getArmoredNotes',passport.authenticate('jwt', { session: false }),(req,res)=>{
  User.findById({_id:req.user._id}).populate('armoredmindurls').exec((err,document)=>{
    if(err){
      res.status(500).json({message:{msgBody:"error occurred",msgError:true}});
    }else{
      res.status(200).json({armoredmindurls:document.armoredmindurls,authenticated:true});
    }

  });
});

router.delete('/deleteArmoredNote/:deleteNote',passport.authenticate('jwt', { session: false }),(req,res)=>{
  //where do we delete first? the notes object or from the user object??
  //lets try the note object
  const id= req.params.deleteNote;
  ArmoredMindURL.findByIdAndDelete(id,(err)=>{
    if(err){
      res.status(500).json({message:{msgBody:"error occurred",msgError:true}});
    }else{
      userId=req.user._id;


    User.updateOne({_id:userId},{$pull:{armoredmindurls:id}},(err)=>{
      if(err){
        res.status(500).json({message:{msgBody:"error occurred ❕",msgError:true}});
      }else{

        res.status(200).json({message:{msgBody:"Deleted Note ✖", msgError:false}});
      }
    })

    }
  })
})

module.exports = router;

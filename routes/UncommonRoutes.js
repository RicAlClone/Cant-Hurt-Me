const express= require('express');
const router= express.Router();
const passport = require('passport');
const User = require('../models/User.js')
const Uncommon = require('../models/Uncommon.model.js');


router.post('/postUncommonNote', passport.authenticate('jwt', { session: false }),(req,res)=>{
  const sentBody=req.body;
      const newNote= new Uncommon(req.body);
      newNote.save((err,saved)=>{
        if(err){

          res.status(500).json({message:{msgBody:'1:error occurred',msgError:true}})
      }
        else{
          req.user.uncommon.push(newNote);
          req.user.save((err,saved)=>{
            if(err){
              res.status(500).json({message:{msgBody:'2:error occurred',msgError:true}})
            }
            else{
              res.status(200).json({message:{msgBody:"saved uncommon note",msgError:false}});
            }
          })

          }
        })
      })




router.get('/getUncommonNotes',passport.authenticate('jwt', { session: false }),(req,res)=>{
  User.findById(req.user._id).populate("uncommon").exec((err,docs)=>{
    if(err){
      res.status(500).json({message:{msgBody:"error occurred",msgError:true}})
    }
    else{
      res.status(200).json({message:{documents:docs.uncommon,msgError:false}})
    }
  })
})



router.delete('/deleteUncommonNote/:id',passport.authenticate('jwt', { session: false }),(req,res)=>{
  const id=req.params.id;

//pulled brings back the whole user model object
  User.findOneAndUpdate({_id:req.user._id},{$pull:{uncommon:id}},(err, pulled)=>{
    if(err){
      res.status(500).json({message:{msgBody:"error occurred",msgError:true}})
    }
    else{

      //deleted brings back the whole uncommon model thats deleted
      Uncommon.findByIdAndDelete(id,(err,deleted)=>{
        if(err){
          res.status(500).json({message:{msgBody:"error occurred",msgError:true}})
        }
        else{
          res.status(200).json({message:{msgBody:"deleted uncommon note",msgError:false}})
        }
      })
    }
  })
})

module.exports=router;

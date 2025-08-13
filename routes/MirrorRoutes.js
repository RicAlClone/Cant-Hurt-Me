var express = require('express');

var router = express.Router();

const passport = require('passport');

const passportConfig = require('../passport');

const User = require('../models/User');

const Mirror = require('../models/Mirror.model');

const ImageModel= require('../models/ImageModel');

router.post("/addMirrorNote",passport.authenticate('jwt', { session: false }), function(req,res){

      const temp=req.body;

      const newMirrorNote= new Mirror({
        title:temp.title,
        message:temp.message
      })
      newMirrorNote.save(function(err){
        if(err){
          res.status(500).json({message:{msgBody:'not saved',msgError:true}});
        }
        else{
          req.user.mirrors.push(newMirrorNote)
          req.user.save(function(err,doc){
            if(err){
               res.status(500).json({message:{msgBody:'not saved',msgError:true}});
            }
            else{
               res.status(200).json({message:{msgBody:"Mirror note added ✔",msgError:false}});
            }
          })

        }
      })
})


router.get("/getMirrorNotes",passport.authenticate('jwt', { session: false }), function(req,res){
  const id=req.user._id;

User.findById({_id:id}).populate('mirrors').exec((err,document)=>{
  if(err){
    console.log('error in mirror route :', err);
    res.status(500).json({message:{msgBody:"error",msgError:true}});
  }
else{
  //console.log('authenticated from mirror route')
  res.status(200).json({mirrors:document.mirrors,authenticated:true});
}
});
});

router.delete("/deleteMirrorNote/:id",passport.authenticate('jwt', { session: false }), function(req,res){

  let idParams = req.params.id;


User.updateOne({_id:req.user.id},{"$pull":{"mirrors":idParams}},{safe:true, multi:true},function(err,obj){
  if(err){
    res.status(500).json({message:{msgBody:"Unable to delete Mirror note",msgError:true}});
  }else{
    Mirror.findByIdAndDelete(idParams,function(err){
      if(err){
        res.status(500).json({message:{msgBody:"Unable to delete Mirror note ❕",msgError:true}});
      }else{
        res.status(200).json({message:{msgBody:"Mirror note deleted ✖",msgError:false}});//i added 400 instead of 200!!
      }
    })
  }
})
});

router.post('/postImage',passport.authenticate('jwt', { session: false }), function(req,res){

          const newImage= new ImageModel(req.body);
          newImage.save((err,saved)=>{
            if(err){
              res.status(500).json({message:{msgBody:"error occured",msgError:true}})
            }
            else{
              req.user.imageModel.push(saved);
              req.user.save(err=>{
                if(err){
                  res.status(500).json({message:{msgBody:"error ❕",msgError:true}})
                }
                else{
                  res.status(200).json({message:{msgBody:"Saved ✔",msgError:false}});
                }
        })
        }
        })
})

router.put('/updateImage/:id',passport.authenticate('jwt', { session: false }), function(req,res){
  const id=req.params.id;
  ImageModel.findOneAndReplace({_id:id},req.body,{},(err,replace)=>{
    if(err){
      res.status(500).json({message:{msgBody:"error",msgError:true}})
    }
    else{
      res.status(200).json({message:{msgBody:"Updated ✔",msgError:false}})
    }
  })
})

router.get('/getImage',passport.authenticate('jwt', { session: false }), function(req,res){
  User.findById({_id:req.user._id}).populate("imageModel").exec((err,docs)=>{
    if(err){
      res.status(500).json({message:{msgBody:"error",msgError:true}})
    }
    else{
      res.status(200).json({documents:docs.imageModel,msgError:false})
    }
  })
})
module.exports= router;

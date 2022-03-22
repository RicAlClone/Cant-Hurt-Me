var express = require('express');

var router = express.Router();

const passport = require('passport');

const passportConfig = require('../passport');

const User = require('../models/User');// i uncapped the user here 5-5-2021 to test.

const Mirror = require('../models/Mirror.model');

const ImageModel= require('../models/ImageModel');

router.post("/addMirrorNote",passport.authenticate('jwt', { session: false }), function(req,res){
// console.log(req.user.mirrors);
  //what do we want to accomplish?
      //i want my server to recieve my title and message ( our schema)
      const temp=req.body;
      console.log(temp);
      //1. pedro added added req.body inside new Mirror but i want
          //to check if i can still get away with the way i set it up.
      const newMirrorNote= new Mirror({
        title:temp.title,
        message:temp.message
      })
      //then i want to save that schema and add it ?
      newMirrorNote.save(function(err){
        if(err){
          res.status(500).json({message:{msgBody:'not saved',msgError:true}});
        }
        else{
          //2. i had forgotten that we need to add to our req.user.
          req.user.mirrors.push(newMirrorNote)
          //3. we also needed to save req.user
          req.user.save(function(err,doc){
            if(err){
               res.status(500).json({message:{msgBody:'not saved',msgError:true}});
            }
            else{
              // console.log('this is our doc ',doc);
               res.status(200).json({message:{msgBody:"Mirror note added",msgError:false}});
            }
          })

        }
      })
})


router.get("/getMirrorNotes",passport.authenticate('jwt', { session: false }), function(req,res){
  //so somehow we need to get all our notes from mirror model using mongoose.
  const id=req.user._id;

//*****************my main question in my mind is how does populate take the documents
    //that match the ids that are in User.mirrors and move them inside User.mirrors.
    //the answer is yes according to a blog -https://medium.com/@nicknauert/mongooses-model-populate-b844ae6d1ee7

User.findById({_id:id}).populate('mirrors').exec((err,document)=>{
  if(err){
    res.status(500).json({message:{msgBody:"error",msgError:true}});
  }
else{
  // console.log(document);
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
        res.status(500).json({message:{msgBody:"Unable to delete Mirror note",msgError:true}});
      }else{
        res.status(200).json({message:{msgBody:"Mirror note deleted",msgError:false}});//i added 400 instead of 200!!
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
                  res.status(500).json({message:{msgBody:"error",msgError:true}})
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

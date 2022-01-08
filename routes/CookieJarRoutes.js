const express= require('express');
const router= express.Router();
const passport= require('passport');
const Cookie = require('../models/CookieJar.model');
const User = require('../models/User');

router.post('/postCookie',passport.authenticate('jwt', { session: false }),(req,res)=>{
  const temp= req.body.cookie;//our cookie is named cookie already

  let newCookie= new Cookie({
    cookie: temp
  })

newCookie.save((err,savedObj)=>{

  if(err){
    res.status(500).json({message:{msgBody:"not saved in req.user.save",msgError:true}});
  }
  else{
    req.user.cookies.push(savedObj);
    req.user.save((err)=>{
      if(err){
        res.status(500).json({message:{msgBody:"not saved",msgError:true}});
      }
      else{
        res.status(200).json({message:{msgBody:"Cookie added",msgError:false}});
      }
    })
  }
})


})

router.get('/getCookies',passport.authenticate('jwt', { session: false }),(req,res)=>{
  //so we want to reach into cookies model?
//i want to find all documents in the collection that pertains to
//current user.

User.findById({_id:req.user._id}).populate('cookies').exec((err,document)=>{
    if(err){
      res.status(500).json({message:{msgBody:"not found",msgError:true}});
    }
    else{
      res.status(200).json({cookies:document.cookies,authenticated:true});

    }
  });
});


router.delete('/deleteCookie/:id',passport.authenticate('jwt', { session: false }),(req,res)=>{
  //so we have to delete from req.user.cookies and also delete from our Cookie collection
  const idSentOver=req.params.id;
  const userID=req.user._id;
  User.findByIdAndUpdate({_id:userID},{$pull:{cookies:idSentOver}},(err)=>{
    if(err){
      res.status(500).json({message:{msgBody:"not deleted",msgError:true}});
    }
    else{
      Cookie.findByIdAndDelete(idSentOver,(err)=>{
        if(err){
          res.status(500).json({message:{msgBody:"not deleted",msgError:true}});
        }
        else{
          res.status(200).json({message:{msgBody:"cookie deleted",msgError:false}});
        }
      })
    }
  })

})

module.exports= router;

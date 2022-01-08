
const mongoose = require('mongoose');

//what do we need ?
  //to make a model

  let cookieSchema= new mongoose.Schema({
    cookie:{
      type:String,
      required:true
    }
  })

  let Cookie= mongoose.model('Cookie',cookieSchema);

  module.exports= Cookie;

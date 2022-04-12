
const mongoose = require('mongoose');

  let cookieSchema= new mongoose.Schema({
    cookie:{
      type:String,
      required:true
    }
  })

  let Cookie= mongoose.model('Cookie',cookieSchema);

  module.exports= Cookie;

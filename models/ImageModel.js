
const mongoose = require('mongoose');

const imageSchema= new mongoose.Schema({
  image:{
    type:String
  }
})

const ImageModel= mongoose.model('ImageModel',imageSchema);

module.exports=ImageModel;

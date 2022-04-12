
const mongoose= require('mongoose');

const armoredMindSchema= new mongoose.Schema({
  imageURL:{
    type: String,
    required: true
  }
})

const ArmoredMindURL= mongoose.model('ArmoredMindURL',armoredMindSchema);

module.exports= ArmoredMindURL;

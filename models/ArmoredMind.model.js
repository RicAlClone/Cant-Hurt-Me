//require mongoose
const mongoose= require('mongoose');

//we have schema which we call here

//this will be our schema
const armoredMindSchema= new mongoose.Schema({
  imageURL:{
    type: String,
    required: true
  }
})

//over here we want to make the model then export it?

const ArmoredMindURL= mongoose.model('ArmoredMindURL',armoredMindSchema);

module.exports= ArmoredMindURL;

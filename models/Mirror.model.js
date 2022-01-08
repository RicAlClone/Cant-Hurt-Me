//1. i did not import mongoose. what i did was import react which has no purpose here.
const mongoose= require('mongoose');

//2. i capitalized Mongoose and im not sure if it would work either way.
const mirrorSchema= new mongoose.Schema({
  //3. i did not make title prop an object.
  //4. i did not even add message with its own object.
  title:{
    type: String,
    required: true
  },
  message:{
    type: String,
    required: true
  }

})

const Mirror= mongoose.model("Mirror",mirrorSchema);

//5. i did not remember how to export this module. and somehow exported it like i would
  // a react component.
module.exports= Mirror;

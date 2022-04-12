const mongoose= require('mongoose');

const mirrorSchema= new mongoose.Schema({

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


module.exports= Mirror;

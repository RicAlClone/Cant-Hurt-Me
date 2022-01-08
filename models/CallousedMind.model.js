let mongoose= require("mongoose");

//we need to create almost the same as our badhand bullets.
  //we need to create a new mongoose model with an object of type string?
  //the we need rename that new model into something else?
  //we export that renamed thing

  let callousedSchema= new mongoose.Schema({
    name:{
      type: String,
      required: true
    }

  });



  module.exports= mongoose.model('CallousedModel', callousedSchema);

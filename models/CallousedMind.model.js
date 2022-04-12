let mongoose= require("mongoose");


  let callousedSchema= new mongoose.Schema({
    name:{
      type: String,
      required: true
    }

  });


  module.exports= mongoose.model('CallousedModel', callousedSchema);

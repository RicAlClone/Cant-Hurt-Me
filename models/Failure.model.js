const mongoose= require('mongoose');

const failureSchema= new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  positives:{
    type:String,
    required:true
  },
  mindset:{
    type:String,
    required:true
  },
  fixes:{
    type:String,
    required:true
  },
  date:{
    type:String,
    required:true
  }
})

const FailureModel= mongoose.model("FailureModel",failureSchema);

module.exports=FailureModel;

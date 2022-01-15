const mongoose= require('mongoose');

const uncommonSchema= new mongoose.Schema({

  title: {
    type:String,
    required:true
  },
  message:{
    type:String,
    required:true
  }
})

const Uncommon= mongoose.model("Uncommon",uncommonSchema);

module.exports=Uncommon;

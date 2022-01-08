
//maybe import mongoose ?
//to make this mongoose model what do we need?
//i need to create a schema
//out of that schema i need to turn it into a model
//i have to export it.

const mongoose=require('mongoose');

const fortyPercentRuleSchema= new mongoose.Schema({
  title:{
    type:String
  },
  sets:{
    type:Number
  },
  reps:{
    type:Number
  },
  hrs:{
    type:Number
  },
  mins:{
    type:Number
  },
  sec:{
    type:Number
  }
})

const FortyPercentRule= mongoose.model('FortyPercentRule', fortyPercentRuleSchema);

module.exports = FortyPercentRule;

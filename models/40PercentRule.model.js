
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

const mongoose = require('mongoose');

const {Schema}= mongoose;

const takingSoulsSchema= new Schema({
  date: {type:String, required:true},
  title: {type:String, required:true},
  paragraph: {type:String, required:true}
})

const TakingSoulNote= mongoose.model('TakingSoulNote', takingSoulsSchema);

module.exports = TakingSoulNote;

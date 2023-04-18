const mongoose= require("mongoose");

const BadhandSchema= new mongoose.Schema({
  name:{
        type:String,
        required: true
    }
    });

module.exports = mongoose.model('Badhand',BadhandSchema);

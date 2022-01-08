const mongoose= require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema= new mongoose.Schema({
  username:{
    type:String,
    required: true,
    min:6,
    max: 15
  },
  password:{
    type:String,
    required: true,
  },

  //basically this code populates with Badhand Schema
  //i put an s at the end of badhand because when we make
  //a new badhand it gets pushed to badhands
  badhands: [{type:mongoose.Schema.Types.ObjectId, ref: "Badhand"}],
  //the ref is based on Mirror.model schema and i hope it works
  mirrors: [{type:mongoose.Schema.Types.ObjectId, ref:"Mirror"}],

  calluses :[{type:mongoose.Schema.Types.ObjectId, ref:"CallousedModel"}],

  takingSouls :[{type:mongoose.Schema.Types.ObjectId, ref:"TakingSoulNote"}],

  armoredmindurls: [{type:mongoose.Schema.Types.ObjectId, ref:"ArmoredMindURL"}],

  cookies:[{type:mongoose.Schema.Types.ObjectId, ref:"Cookie"}],

  fortyPercentRule:[{type:mongoose.Schema.Types.ObjectId,ref:"FortyPercentRule"}],

  dayModel:[{type:mongoose.Schema.Types.ObjectId,ref:"DayModel"}]
});

UserSchema.pre('save',function(next){
  if(!this.isModified('password')){
    console.log('10');
    return next();

  }
  bcrypt.hash(this.password,10,(err,hashed)=>{
    if(err){
      console.log('11');
      return next(err);

    }


    this.password = hashed;
console.log('12');
    next();
  })
})

UserSchema.methods.comparePassword = function(password, cb){
  bcrypt.compare(password,this.password,(err,isMatch)=>{ //changing to arrow
    if(err){
      console.log('13');
      return cb(err);
    }
    else{
      if(!isMatch){
        console.log('14');
        return cb(null,isMatch);
      }
      console.log('15');
      return cb(null,this);
    }
  })
}

module.exports = mongoose.model("User",UserSchema);

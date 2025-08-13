const mongoose= require('mongoose');
const bcrypt = require('bcrypt');

//UserSchema will be our skeleton to build a user to save all thier data.
const UserSchema= new mongoose.Schema({
  username:{
    type:String,
    required: true,
    minLength:[6,'Username requires 6 characters or more']

  },
  password:{
    type:String,
    required: true,
    minLength:[8,'Password requires 8 characters or more']
  },

  //this code populates with Badhand Schema
  //i put an s at the end of badhand because when we make
  //a new badhand it gets pushed to badhands
  badhands: [{type:mongoose.Schema.Types.ObjectId, ref: "Badhand"}],
  //the ref is based on Mirror.model schema
  mirrors: [{type:mongoose.Schema.Types.ObjectId, ref:"Mirror"}],

  imageModel:[{type:mongoose.Schema.Types.ObjectId,ref:"ImageModel"}],

  calluses :[{type:mongoose.Schema.Types.ObjectId, ref:"CallousedModel"}],

  takingSouls :[{type:mongoose.Schema.Types.ObjectId, ref:"TakingSoulNote"}],

  armoredmindurls: [{type:mongoose.Schema.Types.ObjectId, ref:"ArmoredMindURL"}],

  cookies:[{type:mongoose.Schema.Types.ObjectId, ref:"Cookie"}],

  fortyPercentRule:[{type:mongoose.Schema.Types.ObjectId,ref:"FortyPercentRule"}],

  dayModel:[{type:mongoose.Schema.Types.ObjectId,ref:"DayModel"}],

  uncommon:[{type:mongoose.Schema.Types.ObjectId,ref:"Uncommon"}],

  failure:[{type:mongoose.Schema.Types.ObjectId,ref:"FailureModel"}]
});

//when registering this will hash our password.
UserSchema.pre('save',function(next){
// We are checking whether or not we need to hash
//We are checking to see if its modified.If this
//is true we are going to call next(). Checking to see
//if the the password from the password field is modified already
//if i has been modified then there is no need to hash the password.
//We only want to hash the password if its plain Text
//2 Test cases: The user just created his account with plain text.
//User wants to change his password to a new password which is just plain text.
  if(!this.isModified('password')){
    //next() takes us to the next middleware
    //console.log('this password is already modified');
    //when the user exist we are pushed to the next function where
    //we can return a cb to passport authenticate
    return next();
  }
  //this hashes password with 10 salt rounds
  bcrypt.hash(this.password,10,(err,hashed)=>{
    console.log('hashed:',hashed);
    if(err){
      return next(err);
    }
    //this is the document. So document.password = hashed by bcrypt
    this.password = hashed;
    next();
  })
})


UserSchema.methods.comparePassword = function(password, cb){
  bcrypt.compare(password,this.password,(err,isMatch)=>{
    if(err){

      return cb(err);
    }
    else{
      if(!isMatch){
      //if isMatch is false, it returns it.
        return cb(null,isMatch);
      }
      // this is the user object
      return cb(null,this);
    }
  })
}

module.exports = mongoose.model("User",UserSchema);

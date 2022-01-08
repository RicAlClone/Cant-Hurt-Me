// require('dotenv').config()
const passport= require('passport');

const LocalStrategy= require('passport-local').Strategy;

const JwtStrategy = require('passport-jwt').Strategy;

const User = require('./models/User');

const cookieExtractor = req=>{
  let token = null ;
  if(req && req.cookies){
    token = req.cookies["access_token"];
    }
  return token;
}


passport.use(new JwtStrategy({
  jwtFromRequest : cookieExtractor,
  secretOrKey: process.env.SECRET_KEY
},(payload,done)=>{ //changing to arrow function
User.findById({_id: payload.sub},(err,user)=>{
  if(err){
    console.log('1');
    return done(err,false);
  }
  if(user){
    console.log('2');
    return done(null,user);
  }
  else{
    console.log('3');
    return done(null,false);
  }
});
}));

passport.use(new LocalStrategy((username,password,done)=>{ //arrow function
  User.findOne({username},(err,user)=>{ //arrow function
    if(err){
      console.log('4');
      return done(err);
    }
    if(!user){
      console.log('5');
      return done(null,false,{message :"incorrect username"});
    }
     user.comparePassword(password,done);

    console.log('6');
  })
}));

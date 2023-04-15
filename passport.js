const passport= require('passport');

const LocalStrategy= require('passport-local').Strategy;

const JwtStrategy = require('passport-jwt').Strategy;

const User = require('./models/User');

// extracts cookie in a custom way.
//uses that cookie for the session.
const cookieExtractor = req=>{
  let token = null ;
  if(req && req.cookies){
    token = req.cookies["access_token"];
    }
  return token;
}

//everytime we go to a authenticated route we will check that our jwt is correct
//using jwtstrategy. It checks this by making sure jwt has secret_key to make sure
//it wasn't tampered with.
passport.use(new JwtStrategy({
  jwtFromRequest : cookieExtractor,
  secretOrKey: process.env.SECRET_KEY
},(payload,done)=>{
  //payload looks like this when we login with testing5
//   payload: {
//   iss: 'Pulga',
//   sub: '60e511dc35a064105c78bce3',
//   iat: 1668530074,
//   exp: 1668616474
// }
User.findById({_id: payload.sub},(err,user)=>{
  if(err){
    return done(err,false);
  }
  if(user){
    //If the verify function finds a user to which the credential belongs, and that credential is valid,
    //it calls the callback with the authenticating user:
    return done(null,user);
  }
  else{
    return done(null,false);
  }
});
}));

//used when logging in to check correct username and password
passport.use(new LocalStrategy((username,password,done)=>{

  User.findOne({username},(err,user)=>{
    if(err){
      return done(err);
    }
    if(!user){
      //If the credential does not belong to a known user, or is not valid,
      //the verify function calls the callback with false to indicate an authentication failure:
      return done(null,false,{message :"incorrect username"});
    }
    // comparePassword is made in User.js . If our hashed password and typed password are
    // the same then (done call back) should return user object.
     user.comparePassword(password,done);

  })
}));

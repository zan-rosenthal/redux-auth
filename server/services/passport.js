const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//Create local strategy
const localOptions = {usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
  // Verify this username and password
    //call done if verified
  //otherwise call done with false

  User.findeONe({ email: email}, (err, user)=>{
    if(err){ return done(err)}
    if(!user) {return done(null, false); }

    user.comparePassword(password, function(err, isMatch){
      if(err) { return done(err); }
      if(!isMatch) { return done(null, false); }

      return done(null, user);
    });
  })
});

//Set up options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorizaiton'),
  secretOrKey: config.secret
};


//Create strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
  //See if use ID on payload exists in DB
  //If it does call done w/ that user
  //else call done without user object

  User.findById(payload.sub, function(err, user){
    if(err){ return done(err, false); }

    if (user){
      done(null, user);
    }else{
      done(null, false);
    }

  });
});

//Use strategy with passport
passport.use(jwtLogin);
passport.use(localLogin);

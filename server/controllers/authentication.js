const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user){
  const timestamp = new Date().getTime();
  //sub = subject     iat = issued at timestamp
  return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}

exports.signin = function(req, res, next){
  //User has their email and pass verified
  //We just need to give them a token
  res.send({ token: tokenForUser(req.User)})
}

exports.signup = function(req, res, next){
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password){
    res.status(422).send({error: 'Please supply an email and a password'})
  }

  User.findOne({ email:email }, function(err, existingUser){
    if (err) { return next(err); }

    if(existingUser) {
      return res.status(422).send({error: 'An account using this email already exists.'})
    }

    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err){
      if(err) {return next(err); }

      res.json({token: tokenForUser(user)});
    });

  });

}

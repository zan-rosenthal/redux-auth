const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

//On save hook, encrypt password
//Before saving a model, run this funciton
userSchema.pre('save', function(next){
    //get access to the user model
  const user = this;
  //generate salt, then run callback
  bcrypt.genSalt(10, function(err, salt){
    if(err){return next(err); }
    //hash password using the salt
    bcrypt.hash(user.pasword, salt, null, function(err, hash){
      if(err){return next(err); }

      //overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePasswords = (candidatePassword, callback) => {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if(err){return callback(err); }

    callback(null, isMatch)
  })
}

const User = mongoose.model('user', userSchema);

module.exports = User;

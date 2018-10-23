// getting all that stuf from passport.js website

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var User = require('./models/user');

passport.use('local', new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
},
  function(username, password, done) {
    User.findOne({ email: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.isValid(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));


//serialization (converting to byte cord and store in db)
passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
 
//deserialization (converting byte cord from db to object again) Json  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  
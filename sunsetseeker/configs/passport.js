const User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt'); // !!!
const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy; 

passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession, (err, userDocument) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, userDocument);
  });
});

passport.use(
  new LocalStrategy((username, password, next) => {
    User.findOne({ username }, (err, foundUser) => {
      if (err) {
        next(err);
        return;
      }

      if (!foundUser) {
        next(null, false, { message: 'Incorrect username.' });
        return;
      }

      if (!bcrypt.compareSync(password, foundUser.password)) {
        next(null, false, { message: 'Incorrect password.' });
        return;
      }

      next(null, foundUser);
    });
  }), 

);  

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
      callbackURL: "http://localhost:5555/server/auth/google/callback", 
      passReqToCallback: true, 
    }, 
    function (request, accessToken, refreshToken, profile, done) {
      console.log("Google account details", profile); 
      User.findOne({ googleID: profile.id })
      .then(user => {
        if (user) {
          done(null, user); 
          return; 
        }
        User.create({ googleID: profile.id })
        .then(newUser => {
          done(null, newUser); 
        })
        .catch(err => done(err)); 
      })
      .catch(err => done(err)); 
    }
  )); 
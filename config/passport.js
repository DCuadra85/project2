
// requiring passport, in orger to provide authentication with the user this is what we use. 
var passport = require("passport");
// I'm assuming this takes something with passport, so we use do in order to log in with a user name and password
var LocalStrategy = require("passport-local").Strategy;


// requiring our models for our data for some reason
var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
// So here we are using passport and telling it hey! I want to use local stategy which allows me to log in with user name and eail and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "email"
  },
  function(email, password, done) {
    // When a user tries to sign in this code runs
    // So we are using ORM to find the user where email is equal to the email. 
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function(dbUser) {
      // If there's no user with the given email

      // authenticating weather the email and password are incorrect.
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect email."
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user
      return done(null, dbUser);
    });
  }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;

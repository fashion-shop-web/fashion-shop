
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;


const userService = require('../services/userService');

passport.use(new LocalStrategy({
  usernameField: 'email',
},
  async function (email, password, done) {
    const user = await userService.FindByEmail(email);
    if (!user) {
      return done(null, false, { message: 'Incorrect email.' });
    }
    const isValid = await userService.validPassword(password, user);
    if (!isValid) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  }
));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(async function (user, done) {
  done(null, user);
});

module.exports = passport;
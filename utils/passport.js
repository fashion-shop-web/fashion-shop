
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;


const loginService = require('../services/loginService');

passport.use(new LocalStrategy({
  usernameField: 'email',
},
  async function (email, password, done) {
    const user = await loginService.FindByEmail(email);
    if (!user) {
      return done(null, false, { message: 'Incorrect email.' });
    }
    if (!loginService.validPassword(password, user)) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    if (!loginService.validateActive(user)) {
      return done(null, false, { message: 'Account hasnt activated yet' });
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
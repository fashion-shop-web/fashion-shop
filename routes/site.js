const express = require('express');
const router = express.Router();

const siteController = require('../Controller/SiteController');
const passport = require('../utils/passport');


router.get('/contact', siteController.contactPage);

router.get('/signup', siteController.signupPage);
router.post('/signup', siteController.register);

router.get('/login', siteController.loginPage);
router.post('/login', function (req, res, next) {
   passport.authenticate('local', function(err, user) {
      if(err) return next(err);
      //banned
      if(user.status) return res.redirect('/login?banned');
      //wrong password, email address
      if(!user) return res.redirect('/login?wrong-login')
      req.logIn(user, function(err) {
         if (err) return next(err);
         //success
         return res.redirect('/');
      })
   })(req, res, next);
});

router.get('/logout', siteController.logoutPage);

router.get('/', siteController.homePage);


module.exports = router;
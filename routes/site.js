const express = require('express');
const router = express.Router();

const siteController = require('../Controller/SiteController');
const passport = require('../utils/passport');


router.get('/contact', siteController.contactPage);

router.get('/signup', siteController.signupPage);
router.post('/signup', siteController.register);

router.get('/login', siteController.loginPage);
router.post('/login', passport.authenticate('local', { successRedirect: '/',
                                failureRedirect: '/login?wrong-login'
                             }));

router.get('/logout', siteController.logoutPage);

router.get('/', siteController.homePage);


module.exports = router;
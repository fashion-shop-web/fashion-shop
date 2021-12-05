const express = require('express');
const router = express.Router();
const passport = require('../utils/passport');
const loginController = require('../Controller/LoginController');


router.get('/signup', loginController.signupPage);
router.post('/signup', loginController.register);

router.get('/', loginController.loginPage);
router.post('/', function (req, res, next) {
    passport.authenticate('local', function (err, user) {
        if (err) return next(err);
        //banned
        if (user.status) return res.redirect('/login?banned');
        //wrong password, email address
        if (!user) return res.redirect('/login?wrong-login')
        req.logIn(user, function (err) {
            if (err) return next(err);
            //success
            return res.redirect('/');
        })
    })(req, res, next);
});

module.exports = router;
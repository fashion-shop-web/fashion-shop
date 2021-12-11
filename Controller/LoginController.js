const loginService = require('../services/loginService');
const passport = require('../utils/passport');

class LoginController {
    //[GET] login page /login
    loginPage(req, res) {
        const wrongLogin = req.query['wrong-login'] !== undefined;
        const bannedLogin = req.query['banned'] !== undefined;
        res.render('login/login', { wrongLogin, bannedLogin });
    }

    //authenticate
    authenticate(req, res, next) {
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

    }

    //[GET] signup page /signup
    signupPage(req, res) {
        const emailExisted = req.query['email-existed'] !== undefined;
        const passwordNotMatch = req.query['password-not-match'] !== undefined;
        const passwordShort = req.query['password-short'] !== undefined;
        res.render('login/signup', { emailExisted, passwordShort, passwordNotMatch });
    }

    //[POST] store new account
    async register(req, res) {
        const { email, password, confirmPassword, firstName, lastName, number, address } = req.body;
        const checkExists = await loginService.FindByEmail(email);
        if (checkExists) {
            res.redirect('/login/signup?email-existed');
        }
        else {
            if (password.length < 8) {
                res.redirect('/login/signup?password-short');
            }
            else {
                if (password === confirmPassword) {
                    await loginService.register(email, password, firstName, lastName, number, address, req.headers.host);
                    res.redirect('/login/verify');
                }
                else {
                    res.redirect('/login/signup?password-not-match');
                }
            }
        }
    }

    //[GET] require verify after register
    verifyPage(req, res) {
        res.render('login/verify');
    }

    //[GET] active account from link in mail
    async activeNewAccount(req, res) {
        const emailToken = req.params.emailToken;
        await loginService.activeNewAccount(emailToken);
        res.redirect('/login');
    }

    forgetPasswordPage(req, res) {
        res.render('login/forget');
    }

    async sendNewPassword(req, res) {
        const { email } = req.body;
        await loginService.sendNewPassword(email);
        res.redirect('/login');
    }
}

module.exports = new LoginController;
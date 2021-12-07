const loginService = require('../services/loginService');

class LoginController {
    //[GET] login page /login
    loginPage(req, res) {
        const wrongLogin = req.query['wrong-login'] !== undefined;
        const bannedLogin = req.query['banned'] !== undefined;
        res.render('login/login', { wrongLogin, bannedLogin });
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
}

module.exports = new LoginController;
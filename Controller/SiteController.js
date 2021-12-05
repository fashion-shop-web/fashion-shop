const userService = require('../services/userService');

class SiteController {

    //[GET] contact page /contact
    contactPage(req, res) {
        res.render('contact');
    }

    logoutPage(req, res) {
        req.logout();
        res.redirect('/');
    }

    //[GET] login page /login
    loginPage(req, res) {
        const wrongLogin = req.query['wrong-login'] !== undefined;
        const bannedLogin = req.query['banned'] !== undefined;
        res.render('login', {wrongLogin, bannedLogin});
    }

    //[GET] signup page /signup
    signupPage(req, res) {
        const emailExisted = req.query['email-existed'] !== undefined;
        const passwordNotMatch = req.query['password-not-match'] !== undefined;
        const passwordShort = req.query['password-short'] !== undefined;
        res.render('signup', {emailExisted, passwordShort,passwordNotMatch});
    }

    async register (req, res) {
        const {email, password, confirmPassword, firstName, lastName, number, address} = req.body;
        const checkExists = await userService.FindByEmail(email);
        if (checkExists) {
            res.redirect('/signup?email-existed');
        }
        else
        {
            if (password.length < 8) {
                res.redirect('/signup?password-short');
            }
            else
            {
                if (password === confirmPassword) {
                    const user = await userService.register(email, password, firstName, lastName, number, address);
                    res.redirect('/login');
                }
                else
                {
                    res.redirect('/signup?password-not-match');
                }
            }      
        }
    }

    //[GET] load home page /
    homePage(req, res) {
        res.render('index');
    }
}

module.exports = new SiteController;
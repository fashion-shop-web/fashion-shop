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
        res.render('login', {wrongLogin});
    }

    //[GET] signup page /signup
    signupPage(req, res) {
        res.render('signup');
    }

    //[GET] load home page /
    homePage(req, res) {
        res.render('index');
    }
}

module.exports = new SiteController;
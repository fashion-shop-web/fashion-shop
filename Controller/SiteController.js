class SiteController {

    //[GET] contact page /contact
    contactPage(req, res) {
        res.render('contact');
    }

    //[GET] login page /login
    loginPage(req, res) {
        res.render('login');
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
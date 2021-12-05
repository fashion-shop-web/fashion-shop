

class UserController {

    //[GET] arrvinglist
    arrivingList(req, res) {
        res.render('user/arriving');
    }

    //[GET] history list
    historyList(req, res) {
        res.render('user/history');
    }

    //[GET] change password page
    changePassword(req, res) {
        res.render('user/password');
    }

    //[GET] change information page
    updateInformation(req, res) {
        res.render('user/user');
    }

    logOut(req, res) {
        req.logout();
        res.redirect('/');
    }
}

module.exports = new UserController;
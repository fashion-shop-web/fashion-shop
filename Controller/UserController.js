const userService = require('../services/userService');

class UserController {

    //[GET] arrvinglist
    async arrivingList(req, res) {
        const userID = req.session?.passport?.user?._id;
        const orders = await userService.getArriving(userID)
        res.render('user/arriving', { orders });
    }

    //[GET] cancle order
    async cancleOrder(req, res) {
        const userOrder = req.params.id;
        await userService.cancleOrder(userOrder);
        req.session.passport.user.arriving = parseInt(req.session.passport.user.arriving) - 1;
        res.redirect('/user/arriving');
    }

    //[GET] history list
    async historyList(req, res) {
        const userID = req.session.passport.user._id;
        const orders = await userService.getHistory(userID)
        res.render('user/history', { orders });
    }

    //[GET] change password page
    changePassword(req, res) {
        res.render('user/password');
    }

    //[GET] change information page
    updateInformation(req, res) {
        res.render('user/information');
    }

    logOut(req, res) {
        req.logout();
        res.redirect('/');
    }

    async storeUpdateInformation(req, res) {
        const valid = await userService.updateInfo(req.params.id, req.body);
        if (valid) {
            const customer = await userService.getCustomer(req.params.id);
            req.session.passport.user = customer;
            req.session.message = "ok";
            req.session.save(function (err) {
                console.log(err);
                res.render('user/information', { newinfo: customer });
            })

        } else {
            req.session.save(function (err) { console.log(err); })
            res.render('user/information', { error: "duplicate email" });
        }
    }

    async storeNewPass(req, res) {
        const valid = await userService.validateChangePass(req.params.id, req.body);
        if (valid === 1) {
            res.render('user/password', { message: "Wrong current password" });
        } else if (valid === 2) {
            res.render('user/password', { message: "Cannot change the same password" });
        } else if (valid === 3) {
            res.render('user/password', { message: "Password must contain at last 8 characters" });
        } else if (valid === 4) {
            res.render('user/password', { message: "Retype does not match new password" });
        } else {
            res.render('user/password', { success: "Password has been changed" });
        }
    }

    async createOrder(req, res) {
        const id = req.params.id;
        const content = req.body;
        req.session.passport.user.totalCart = 0;
        req.session.passport.user.arriving = parseInt(req.session.passport.user.arriving) + 1;
        const error = await userService.newOrder(id, content);
        if (!error) res.render('checkout', { message: 'Checkout success', productsLength: 0 })
        else res.render('checkout', { error: 'Cannot checkout empty cart', productsLength: 0 })
    }
}

module.exports = new UserController;
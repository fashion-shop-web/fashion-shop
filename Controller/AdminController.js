class AdminController {

    //[GET] show list user
    showListUser(req, res) {
        res.render('admin/customer')
    }

    //[GET] show list order
    showListOrder(req, res) {
        res.render('admin/order')
    }

}

module.exports = new AdminController;
const apiService = require('../services/apiService');

class ApiController {
    async storeComment(req, res) {
        const newComment = req.body;
        const productID = req.params.productID

        const error = await apiService.storeNewComment(productID, newComment)
        res.send({ error });
    }

    async addCart(req, res) {
        const userID = req.body.userID;
        const productID = req.params.productID;
        const error = await apiService.storeCart(productID, userID);
        if (error === 0 || error === 1) req.session.passport.user.totalCart = req.session.passport.user.totalCart + 1;
        res.send({ error })
    }

    async deleteCart(req, res) {
        const productID = req.params.productID;
        const userID = req.body.userID;
        const error = await apiService.removeProductFromCart(userID, productID);
        if (!error) req.session.passport.user.totalCart = req.session.passport.user.totalCart - 1;
        res.send({ error });
    }

    async checkOut(req, res) {
        console.log(req.body);
    }
}

module.exports = new ApiController;
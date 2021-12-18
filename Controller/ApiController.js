const apiService = require('../services/apiService');
const cartService = require('../services/cartService');
const productService = require('../services/productService');

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
        if (error === 0) { //user
            const len = await cartService.getCartLen(userID);
            req.session.passport.user.totalCart = parseInt(req.session.passport.user.totalCart) + 1;
            res.send({ len })
        } else if (error === 1) {//guest
            const product = await productService.findProductByID(productID);
            res.send({ product })
        }
        else res.send({ error }) //fail
    }

    async deleteCart(req, res) {
        const productID = req.params.productID;
        const userID = req.body.userID;
        const error = await apiService.removeProductFromCart(userID, productID);
        if (!error) {
            req.session.passport.user.totalCart = parseInt(req.session.passport.user.totalCart) - 1;
            const len = await cartService.getCartLen(userID);
            const total = await cartService.getTotalPrice(userID);
            res.send({ len, total }) //success, update new product len
        } else res.send({ error }); //remove fail

    }

    async mapCartFromLocal(req, res) {
        const userID = req.body.userID;
        const products = req.body.guestCart;
        req.session.passport.user.totalCart = parseInt(req.session.passport.user.totalCart) + products.length;
        await apiService.appendCartFromLocal(userID, products);
        res.send({ len: req.session.passport.user.totalCart })
    }
}

module.exports = new ApiController;
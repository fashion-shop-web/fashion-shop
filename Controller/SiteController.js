const productService = require('../services/productService');
const cartService = require('../services/cartService');

class SiteController {

    //[GET] contact page /contact
    contactPage(req, res) {
        res.render('contact');
    }

    //[GET] load home page /
    async homePage(req, res) {
        const products = await productService.homeProduct();
        res.render('index', { products });
    }

    //[GET] cart page
    async checkOut(req, res) {
        const userID = req.session?.passport?.user?._id;
        let products = [];
        let userCart = null;
        if (userID) {
            [products, userCart] = await cartService.getCart(userID)
        }
        res.render('checkout', { products, productsLength: products.length, userCart });
    }
}

module.exports = new SiteController;
const productService = require('../services/productService');

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
    checkOut(req, res) {
        res.render('checkout');
    }
}

module.exports = new SiteController;
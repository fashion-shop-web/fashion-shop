const product = require('../models/product');

class ProductController {

    //[GET] men product list
    menList(req, res) {
        res.render('product/men')
    }

    //[GET] women product list
    womenList(req, res) {
        res.render('product/women')
    }

    //[GET] sale product list
    saleList(req, res) {
        res.render('product/sale')
    }

    //[GET] detail product (will add slug)
    showDetail(req, res) {
        product.find({})
        .then(products => res.json(products))
        .catch(error => console.log("error"));
        // res.render('product/product');
    }
}

module.exports = new ProductController;
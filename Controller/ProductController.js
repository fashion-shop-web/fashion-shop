const myService = require('../services/productService');


class ProductController {
    //[GET] men product list
    async menList(req, res) {
        try {
            const [products, pages] = await myService.adjustList(false, req.query.page || 1);
            res.render('product/men', { products, pages, currentPage: req.query.page || 1 });
        } catch (err) {
            console.log(err);
        }
    }

    //[GET] women product list
    async womenList(req, res) {
        try {
            const [products, pages] = await myService.adjustList(true, req.query.page || 1);
            res.render('product/women', { products, pages, currentPage: req.query.page || 1 });
        } catch (err) {
            console.log(err);
        }
    }

    //[GET] sale product list
    saleList(req, res) {
        res.render('product/sale')
    }

    //[GET] detail product (will add slug)
    async showDetail(req, res) {
        try {
            const [detail, relate] = await myService.adjustDetail(req.params.slug);
            res.render('product/product', { detail, relate });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new ProductController;
const productService = require('../services/productService');


class ProductController {
    //[GET] all product list
    async allList(req, res) {
        const request = req.query;
        const page = request.page || 1;
        delete request.page;
        const filter = request;

        try {
            const [products, pages, sort] = await productService.getListProduct(page, filter, 'all');
            res.render('product/all', { products, pages, currentPage: page, sort });
        } catch (err) {
            console.log(err);
        }
    }

    //[GET] men product list
    async menList(req, res) {
        const request = req.query;
        const page = request.page || 1;
        delete request.page;
        const filter = request;

        try {
            const [products, pages, sort] = await productService.getListProduct(page, filter, 'men');
            res.render('product/men', { products, pages, currentPage: page, sort });
        } catch (err) {
            console.log(err);
        }
    }

    //[GET] women product list
    async womenList(req, res) {
        const request = req.query;
        const page = request.page || 1;
        delete request.page;
        const filter = request;

        try {
            const [products, pages, sort] = await productService.getListProduct(page, filter, 'women');
            res.render('product/men', { products, pages, currentPage: page, sort });
        } catch (err) {
            console.log(err);
        }
    }

    //[GET] sale product list
    async saleList(req, res) {
        const request = req.query;
        const page = request.page || 1;
        delete request.page;
        const filter = request;

        try {
            const [products, pages, sort] = await productService.getListProduct(page, filter, 'sale');
            res.render('product/men', { products, pages, currentPage: page, sort });
        } catch (err) {
            console.log(err);
        }
    }

    //[GET] detail product (will add slug)
    async showDetail(req, res) {
        const page = req.query.page || 1;
        try {
            const [detail, relate, comments, pages, len] = await productService.adjustDetail(req.params.slug, page);
            res.render('product/product', { detail, relate, comments, len, pages, currentPage: page });
        } catch (err) {
            console.log(err);
        }
    }

    //[GET] search product list
    async searchList(req, res) {
        try {
            const [products, pages] = await productService.searchProduct(req.query.name, req.query.page || 1);
            res.render('product/search', { products, pages, currentPage: req.query.page || 1 });
        } catch (err) {
            console.log(err);
        }
    }

    //[GET] advanced search product list
    async advanceSearchList(req, res) {
        try {
            const [products, pages] = await productService.advancedSearchProduct(req.query.name, req.query.category, req.query.brand, req.query.sale, req.query.page || 1);
            res.render('product/search', { products, pages, currentPage: req.query.page || 1 });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new ProductController;
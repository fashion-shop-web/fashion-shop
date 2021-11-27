const product = require('../models/product');

class ProductController {
    //[GET] men product list
    async menList(req, res) {
        try {
            let products = await product.find({ gender: false }).lean();

            products = products.map(item => {
                let name = item.name.length < 30 ? item.name : (item.name.substring(0, 30) + '.....')
                let slug = "/product/" + item.slug
                let sale = item.sale !== 0 ? item.sale + '%' : 'No promotion'
                return { ...item, name: name, slug: slug, sale: sale }
            })

            res.render('product/men', { products })
        } catch (error) {
            console.log(error)
        }
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
    async showDetail(req, res) {
        let detail = await product.findOne({ slug: req.params.slug }).lean();

        detail.gender = detail.gender ? 'Women' : 'Men';
        if (detail.sale !== 0) {
            detail.sale = detail.price - (detail.price * detail.sale / 100);
        }

        let relate = await (await product.find({ category: detail.category }).lean()).splice(0, 4);
        relate = relate.map(item => {
            let name = item.name.length < 30 ? item.name : (item.name.substring(0, 30) + '.....')
            let slug = "/product/" + item.slug
            let sale = item.sale !== 0 ? item.sale + '%' : 'No promotion'
            return { ...item, name: name, slug: slug, sale: sale }
        })
        res.render('product/product', { detail, relate });
    }
}

module.exports = new ProductController;
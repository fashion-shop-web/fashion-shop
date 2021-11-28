const product = require('../models/product');

const adjustList = async (gender, reqPage) => {
    let products = [];
    let pages = [];

    try {
        products = await product.find({ gender: gender }).lean();
        const perPage = 6;
        const page = parseInt(reqPage);

        const start = (page - 1) * perPage;
        const end = page * perPage;
        for (let i = 0; i < products.length / perPage; i++) {
            let temp = {};
            temp.page = i + 1;
            temp.pageA = `?page=${i + 1}`;
            pages.push(temp);
        }
        products = products.slice(start, end);

        products = products.map(item => {
            let name = item.name.length < 28 ? item.name : (item.name.substring(0, 28) + '.....')
            let slug = "/product/" + item.slug
            let sale = item.sale !== 0 ? item.sale + '%' : 'No promotion';
            return { ...item, name: name, slug: slug, sale: sale }
        })


        return [products, pages];
    } catch (error) {
        console.log(error)
    }

    return [products, pages];
}

const adjustDetail = async (slug) => {
    let detail = null;
    let relate = null;
    try {
        detail = await product.findOne({ slug: slug }).lean();
        relate = await product.find({ category: detail.category }).lean();

        detail.gender = detail.gender ? 'Women' : 'Men';
        if (detail.sale !== 0) {
            detail.sale = Math.ceil(detail.price - (detail.price * detail.sale / 100));
        }

        relate = relate.slice(0, 4);
        relate = relate.map(item => {
            let name = item.name.length < 30 ? item.name : (item.name.substring(0, 30) + '.....')
            let slug = "/product/" + item.slug
            let sale = item.sale !== 0 ? item.sale + '%' : 'No promotion'
            return { ...item, name: name, slug: slug, sale: sale }
        })

        return [detail, relate];
    } catch (err) {
        console.log(err);
    }
    return [detail, relate];
}

module.exports = {
    adjustList,
    adjustDetail,

}
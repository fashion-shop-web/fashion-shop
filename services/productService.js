const product = require('../models/product');

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

const homeProduct = async () => {
    try {
        let products = await product.find({}).lean();

        shuffle(products);
        products = products.slice(0, 4);
        products = products.map(item => {
            let name = item.name.length < 25 ? item.name : (item.name.substring(0, 25) + '.....')
            let slug = "/product/" + item.slug
            let sale = item.sale !== 0 ? item.sale + '%' : 'No promotion'
            return { ...item, name: name, slug: slug, sale: sale }
        })

        return products;
    } catch (err) {
        console.log(err);
    }
}

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

        shuffle(relate);
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

const getAll = async (reqPage) => {
    let products = [];
    let pages = [];

    try {
        products = await product.find({}).lean();
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
            let name = item.name.length < 28 ? item.name : (item.name.substring(0, 28) + '.....');
            let slug = "/product/" + item.slug;
            let sale = item.sale !== 0 ? item.sale + '%' : 'No promotion';
            return { ...item, name: name, slug: slug, sale: sale }
        })


        return [products, pages];
    } catch (error) {
        console.log(error)
    }

    return [products, pages];
}

const getSale = async (reqPage) => {
    let products = [];
    let pages = [];

    try {
        products = await product.find({}).lean();
        products = products.filter(item => item.sale != 0);
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

const searchProduct = async (productName, reqPage) => {
    let products = [];
    let pages = [];

    try {
        products = await product.find({ name: { "$regex": productName, "$options": "i" } }).lean();

        const perPage = 6;
        const page = parseInt(reqPage);

        const start = (page - 1) * perPage;
        const end = page * perPage;
        for (let i = 0; i < products.length / perPage; i++) {
            let temp = {};
            temp.page = i + 1;
            temp.pageA = `&page=${i + 1}`;
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

module.exports = {
    adjustList,
    adjustDetail,
    getAll,
    getSale,
    searchProduct,
    homeProduct
}
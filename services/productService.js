const product = require('../models/product');
const commentService = require('../services/commentService');

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

const findProductByID = async (id) => {
    try {
        const aProduct = await product.findOne({ _id: id }).lean();
        return aProduct;
    } catch (err) {
        console.log(err);
    }
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

const adjustDetail = async (slug, reqPage) => {
    let detail = null;
    let relate = null;
    let comments = null;
    let pages = [];
    let len = 0;

    try {
        detail = await product.findOne({ slug: slug }).lean();
        comments = await commentService.findProductComments(detail._id);
        relate = await product.find({ category: detail.category }).lean();

        detail.gender = detail.gender ? 'Women' : 'Men';
        if (detail.sale !== 0) {
            detail.sale = Math.ceil(detail.price - (detail.price * detail.sale / 100));
        }

        shuffle(relate);
        relate = relate.slice(0, 4);
        relate = relate.map(item => {
            let name = item.name.length < 25 ? item.name : (item.name.substring(0, 25) + '.....')
            let slug = "/product/" + item.slug
            let sale = item.sale !== 0 ? item.sale + '%' : 'No promotion'
            return { ...item, name: name, slug: slug, sale: sale }
        })

        const perPage = 5;
        const page = parseInt(reqPage);

        const start = (page - 1) * perPage;
        const end = page * perPage;

        for (let i = 0; i < comments.length / perPage; i++) {
            pages.push(i + 1);
        }
        len = comments.length;
        comments = comments.reverse();
        comments = comments.slice(start, end);

        for (let i = 0; i < comments.length; i++) {
            const date = new Date(comments[i].createdAt);
            const month = date.getMonth() + 1;
            comments[i].date = date.getDate() + '/' + month + '/' + date.getFullYear();
        }

        return [detail, relate, comments, pages, len];
    } catch (err) {
        console.log(err);
    }
}

const getListProduct = async (reqPage, filter, option) => {
    let products = [];
    let pages = [];
    let sort = {};
    let querySort = '';

    try {
        if (Object.keys(filter).length !== 0) [products, sort, querySort] = await SortProduct(filter, option);
        else {
            sort.AllAccessories = true;
            sort.AllBrands = true;
            sort['0s'] = true;
            querySort += '&AllAccessories=on&AllBrands=on&radioSale=0';

            switch (option) {
                case 'all': {
                    products = await product.find({}).lean();
                    break;
                }
                case 'men': {
                    products = await product.find({ gender: false }).lean();
                    break;
                }
                case 'women': {
                    products = await product.find({ gender: true }).lean();
                    break;
                }
                case 'sale': {
                    products = await product.find({ sale: { $gt: 0 } }).lean();
                    break;
                }
                default: throw new Error('invalid option get product')
            };
        }

        const perPage = 6;
        const page = parseInt(reqPage);

        const start = (page - 1) * perPage;
        const end = page * perPage;
        for (let i = 0; i < products.length / perPage; i++) {
            let temp = {};
            temp.page = i + 1;
            temp.pageA = `?page=${i + 1}` + querySort;
            pages.push(temp);
        }
        products = products.slice(start, end);

        products = products.map(item => {
            let name = item.name.length < 25 ? item.name : (item.name.substring(0, 25) + '.....');
            let slug = "/product/" + item.slug;
            let sale = item.sale !== 0 ? item.sale + '%' : 'No promotion';
            return { ...item, name: name, slug: slug, sale: sale }
        })

        return [products, pages, sort];
    } catch (error) {
        console.log(error)
    }
}

const SortProduct = async (filter, option) => {
    const category = [];
    const brand = [];
    let sale = 0;
    let products = [];
    const sort = {};
    let querySort = '&';

    for (const item in filter) {
        if (item === 'Handbag' || item === 'Bracelet' || item === 'Wrist watch') {
            category.push(item);
            sort[item.replace(' ', '')] = true;
            querySort += `${item.replace(' ', '+')}=on&`
        } else if (filter[item] === '10' || filter[item] === '20' || filter[item] === '30' || filter[item] === '40' || filter[item] === '50' || filter[item] === '0') {
            sale = filter[item];
            sort[filter[item] + 's'] = true;
            querySort += `radioSale=${filter[item]}&`
        } else if (item !== 'AllAccessories' && item !== 'AllBrands' && item != 'page') {
            brand.push(item);
            sort[item.replace(' ', '')] = true;
            querySort += `${item.replace(' ', '+')}=on&`
        }
    }

    let isCategory = true;
    let isBrand = true;

    if (category.length === 0) {
        isCategory = false;
        sort.AllAccessories = true;
    }

    if (brand.length === 0) {
        isBrand = false;
        sort.AllBrands = true;
    }

    if (Object.keys(filter).includes('AllAccessories')) {
        isCategory = false;
        sort.AllAccessories = true;
    }
    if (Object.keys(filter).includes('AllBrands')) {
        isBrand = false;
        sort.AllBrands = true;
    }

    switch (option) {
        case 'all': {
            if (isCategory) {
                if (isBrand) {
                    products = await product.find({ sale: { $gte: parseInt(sale) }, brand: { $in: brand }, category: { $in: category } }).lean();
                } else {
                    products = await product.find({ sale: { $gte: parseInt(sale) }, category: { $in: category } }).lean();
                }
            } else {
                if (isBrand) {
                    products = await product.find({ sale: { $gte: parseInt(sale) }, brand: { $in: brand } }).lean();
                } else {
                    products = await product.find({ sale: { $gte: parseInt(sale) } }).lean();
                }
            }
            break;
        }
        case 'men': {
            if (isCategory) {
                if (isBrand) {
                    products = await product.find({ sale: { $gte: parseInt(sale) }, brand: { $in: brand }, category: { $in: category }, gender: false }).lean();
                } else {
                    products = await product.find({ sale: { $gte: parseInt(sale) }, category: { $in: category }, gender: false }).lean();
                }
            } else {
                if (isBrand) {
                    products = await product.find({ sale: { $gte: parseInt(sale) }, brand: { $in: brand }, gender: false }).lean();
                } else {
                    products = await product.find({ sale: { $gte: parseInt(sale) }, gender: false }).lean();
                }
            }
            break;
        }
        case 'women': {
            if (isCategory) {
                if (isBrand) {
                    products = await product.find({ sale: { $gte: parseInt(sale) }, brand: { $in: brand }, category: { $in: category }, gender: true }).lean();
                } else {
                    products = await product.find({ sale: { $gte: parseInt(sale) }, category: { $in: category }, gender: true }).lean();
                }
            } else {
                if (isBrand) {
                    products = await product.find({ sale: { $gte: parseInt(sale) }, brand: { $in: brand }, gender: true }).lean();
                } else {
                    products = await product.find({ sale: { $gte: parseInt(sale) }, gender: true }).lean();
                }
                break;
            }
        }
        case 'sale': {
            if (isCategory) {
                if (isBrand) {
                    products = await product.find({ sale: { $gte: parseInt(sale) }, brand: { $in: brand }, category: { $in: category }, sale: { $gt: 0 } }).lean();
                } else {
                    products = await product.find({ sale: { $gte: parseInt(sale) }, category: { $in: category }, sale: { $gt: 0 } }).lean();
                }
            } else {
                if (isBrand) {
                    products = await product.find({ sale: { $gte: parseInt(sale) }, brand: { $in: brand }, sale: { $gt: 0 } }).lean();
                } else {
                    products = await product.find({ sale: { $gte: parseInt(sale) }, sale: { $gt: 0 } }).lean();
                }
                break;
            }
        }
        default: throw new Error('invalid option');
    }
    return [products, sort, querySort];
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
            let name = item.name.length < 25 ? item.name : (item.name.substring(0, 25) + '.....')
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

const advanceSearchList = async (productName, productCategory, productBrand, productSale, reqPage) => {
    let products = [];
    let pages = [];

    try {
        products = await product.find({ name: { "$regex": productName, "$options": "i" }, 
        category: { "$regex": productCategory, "$options": "i" },
        brand: { "$regex": productBrand, "$options": "i" },
        sale: { "$regex": productSale, "$options": "i" }
    }).lean();

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
            let name = item.name.length < 25 ? item.name : (item.name.substring(0, 25) + '.....')
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
    adjustDetail,
    getListProduct,
    searchProduct,
    homeProduct,
    SortProduct,
    findProductByID,
    advanceSearchList,
}
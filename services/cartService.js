const cart = require('../models/cart')
const productService = require('../services/productService');

const getCart = async (userID) => {
    try {
        const userCart = await cart.findOne({ userID: userID }).lean();
        const products = [];
        for (let i = 0; i < userCart.products.length; i++) {
            const temp = await productService.findProductByID(userCart.products[i].substring(userCart.products[i].indexOf('-') + 1, userCart.products[i].length))
            temp.price = Math.ceil(temp.price - (temp.price * temp.sale / 100))
            temp.fakeID = `${i}-${temp._id.toString()}`
            products.push(temp);
        }
        return products;
    } catch (err) {
        console.log(err);
    }
}

const getCartByUserID = async (userID) => {
    try {
        const userCart = await cart.findOne({ userID: userID }).lean();
        return userCart;
    } catch (err) {
        console.log(err);
    }
}

const createNewCart = async (userID) => {
    try {
        return await cart.create({
            userID: userID,
        })
    } catch (err) {
        console.log(err)
    }
}

const removeAllCartItem = async (userID) => {
    try {
        await cart.updateOne({ userID: userID }, { products: [] })
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getCart,
    getCartByUserID,
    createNewCart,
    removeAllCartItem
}
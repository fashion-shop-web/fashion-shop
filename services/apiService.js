const comment = require('../models/comment');
const product = require('../models/product');
const cart = require('../models/cart');

const storeNewComment = async (productID, newComment) => {
    try {
        const temp = new comment({ ...newComment, productID });
        await temp.save();
        return 0; //success
    } catch (err) {
        console.log(err);
        return 1;// store fail
    }
}

const storeCart = async (productID, userID) => {
    try {
        const userCart = await cart.findOne({ userID: userID });
        if (userCart) {
            userCart.products.push(`${userCart.products.length}-${productID}`);
            const aProduct = await product.findOne({ _id: productID });
            userCart.total = userCart.total + Math.ceil(aProduct.price - (aProduct.price * aProduct.sale / 100))
            await userCart.save();
            return 0; //save success
        }

        return 1; //no account
    } catch (err) {
        console.log(err);
        return 2; //error
    }
}

const removeProductFromCart = async (userID, productID) => {
    try {
        const userCart = await cart.findOne({ userID: userID });
        for (let i = 0; i < userCart.products.length; i++) {
            if (userCart.products[i] === productID) {
                userCart.products.splice(i, 1);
                const aProduct = await product.findOne({ _id: productID.substring(productID.indexOf('-') + 1, productID.length) });
                userCart.total = userCart.total - Math.ceil(aProduct.price - (aProduct.price * aProduct.sale / 100))
            }
        }
        await userCart.save();
        return 0; //success
    } catch (err) {
        console.log(err)
        return 1; //delete fail
    }
}

module.exports = {
    storeNewComment,
    storeCart,
    removeProductFromCart
}
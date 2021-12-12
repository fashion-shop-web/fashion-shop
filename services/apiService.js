const comment = require('../models/comment');
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
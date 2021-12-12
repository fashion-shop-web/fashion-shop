const comment = require('../models/comment')

const findProductComments = async (productID) => {
    try {
        const comments = await comment.find({ productID: productID }).lean();
        return comments;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    findProductComments,
}
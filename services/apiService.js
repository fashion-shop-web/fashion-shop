const comment = require('../models/comment');

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

module.exports = {
    storeNewComment,
}
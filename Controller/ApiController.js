const apiService = require('../services/apiService');

class ApiController {
    async storeComment(req, res) {
        const newComment = req.body;
        const productID = req.params.productID

        const error = await apiService.storeNewComment(productID, newComment)
        res.send({ error });
    }
}

module.exports = new ApiController;
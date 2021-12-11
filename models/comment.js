const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const comment = new Schema({
    productID: { type: String, required: true },
    userID: { type: String, required: true },
    lastName: { type: String, required: true },
    content: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('comment', comment);
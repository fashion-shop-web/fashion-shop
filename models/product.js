const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const product = new Schema({
    id: ObjectId,
    name: { type: String, maxlength: 100, required: true },
    gender: { type: Boolean }, //0 = men / 1 = women
    price: { type: Number, required: true },
    commentsId: { type: String, required: true },
    image: { type: Array },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: Array },
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('product', product);
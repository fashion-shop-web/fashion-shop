const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const comment = new Schema({
    id: ObjectId,
    product_id: { type: String, required: true },
    block: { type: Array }
});

module.exports = mongoose.model('comment', comment);
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const user = new Schema({
    id: ObjectId,
    firstName: { type: String, maxlength: 15, required: true },
    lastName: { type: String, maxlength: 15, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, maxlength: 100, required: true },
    number: { type: String, maxlength: 11, required: true },
    role: { type: Boolean, default: 0 }, //user/admin
    status: { type: String, default: 0 }, //ban/unban
    cartId: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model('user', user);
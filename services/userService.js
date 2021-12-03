const userModel = require('../models/user');

exports.FindByEmail = (email) => {
    return userModel.findOne({
        email: email
    }).lean();
}

exports.validPassword = (password, user) => {
    return user.password === password;
}
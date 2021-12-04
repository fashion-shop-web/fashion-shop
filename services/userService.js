const userModel = require('../models/user');
const bcrypt = require('bcrypt')

exports.FindByEmail = (email) => {
    return userModel.findOne({
        email: email
    }).lean();
}

exports.validPassword = (password, user) => {
    return bcrypt.compare(password, user.password);
}

exports.register = async (email, password, firstName, lastName, number, address) => {
    const hashPassword = await bcrypt.hash(password,10);
    return userModel.create({
        email: email,
        password: hashPassword,
        firstName: firstName,
        lastName: lastName,
        number: number,
        address: address,
        status: false
    })
}
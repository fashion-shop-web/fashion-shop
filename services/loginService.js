const userModel = require('../models/user');
const cartService = require('../services/cartService');
const orderService = require('../services/orderService');
const bcrypt = require('bcrypt')
const salt = 10;
const transporter = require('../utils/nodemailer');
const crypto = require('crypto');
require('dotenv').config;

exports.FindByEmail = async (email) => {
    return await userModel.findOne({
        email: email,
        role: false
    }).lean();
}

exports.FindCart = async (userID) => {
    return await cartService.getCartByUserID(userID);
}

exports.getNumberArriving = async (userID) => {
    const orders = await orderService.getAllOrder(userID);
    const len = orders.filter(item => (item.status !== 'received' && item.status !== 'cancel')).length;
    console.log(len)
    return len;
}

exports.validPassword = (password, user) => {
    return bcrypt.compare(password, user.password);
}

exports.validateActive = (user) => {
    return user.active;
}

exports.register = async (email, password, firstName, lastName, number, address, host) => {
    const hashPassword = await bcrypt.hash(password, salt);
    const emailToken = crypto.randomBytes(20).toString('hex');;

    const mailOption = {
        from: process.env.SHOP_GMAIL_USERNAME,
        to: email,
        subject: 'Email verification',
        html: `<div style="background-color: #ea562dda; padding: 2em 2em;">
                    <h1 style="text-align: center;">Thank you for registering on our web</h1>
                    <h4 style="text-align: center;">Please click <a href="http://${host}/login/verify/${emailToken}">here</a> to activate your account</h4>
                </div>`
    }

    transporter.sendMail(mailOption, function (err, info) {
        if (err) console.log(err);
    })

    await userModel.create({
        email: email,
        password: hashPassword,
        firstName: firstName,
        lastName: lastName,
        number: number,
        address: address,
        emailToken: emailToken,
    })

    const userID = await userModel.findOne({ email: email })
    await cartService.createNewCart(userID._id);
}

exports.activeNewAccount = async (emailToken) => {
    const account = await userModel.findOne({ emailToken: emailToken });
    if (account) {
        account.emailToken = null;
        account.active = true;
        await account.save();
    }
}

exports.sendNewPassword = async (email) => {
    const account = await userModel.findOne({ email: email });

    if (account) {
        const newPass = (Math.random() + 1).toString(36).substring(2);
        account.password = await bcrypt.hash(newPass, salt);

        const mailOption = {
            from: process.env.SHOP_GMAIL_USERNAME,
            to: email,
            subject: 'Forget password',
            html: `<div style="background-color: #ea562dda; padding: 2em 2em;">
                        <h1 style="text-align: center;">This is your new password</h1>
                        <h4 style="text-align: center;">${newPass}</h4>
                    </div>`
        }

        transporter.sendMail(mailOption, function (err, info) {
            if (err) console.log(err);
        })

        await account.save();
    }
}
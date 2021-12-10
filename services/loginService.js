const userModel = require('../models/user');
const bcrypt = require('bcrypt')
const salt = 10;
const transporter = require('../utils/nodemailer');
require('dotenv').config;

exports.FindByEmail = (email) => {
    return userModel.findOne({
        email: email,
        role: false
    }).lean();
}

exports.validPassword = (password, user) => {
    return bcrypt.compare(password, user.password);
}

exports.validateActive = (user) => {
    return user.active;
}

exports.register = async (email, password, firstName, lastName, number, address, host) => {
    const hashPassword = await bcrypt.hash(password, salt);
    const emailToken = await bcrypt.hash(email, salt);

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
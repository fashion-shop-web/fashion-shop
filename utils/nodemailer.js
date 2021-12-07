const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.SHOP_GMAIL_USERNAME,
        pass: process.env.SHOP_GMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: true,
    }
})


const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
);
module.exports=sequelize;
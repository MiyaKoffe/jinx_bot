const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'jinx_bot',
    'root',
    'root',
    {
        host: '185.192.108.50',
        port: '6432',
        dialect: 'postgres'
    }
)
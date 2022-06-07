const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'j',
    'root',
    'root',
    {
        host: '5.188.128.142',
        port: '6432',
        dialect: 'postgres'
    }
)
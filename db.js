const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'jinx_bot',
    'root',
    'root',
    {
        host: '',
        port: '',
        dialect: 'postgres'
    }
)
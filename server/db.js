const { Sequelize } = require('sequelize')

module.exports = new Sequelize(
    'BestBuyBeauty',
    'postgres',
    'root',
    {
        dialect: 'postgres',
        host: 'localhost',
        port: '5432'
    }
)
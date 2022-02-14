const Sequelize = require('sequelize');

const sequelize = new Sequelize('angular', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;
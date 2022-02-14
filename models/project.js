const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Project = sequelize.define('tbProject', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    teamSize: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
},
{
    timestamps: false,
    tableName: 'tbProject'
});

module.exports = Project;
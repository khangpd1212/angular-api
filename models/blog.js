const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Post = sequelize.define('tblposts', {
    postId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    create_date: {
        type: Sequelize.DATE,
        allowNull: false
    }
},
{
    timestamps: false,
    tableName: 'tblposts'
});

module.exports = Post;
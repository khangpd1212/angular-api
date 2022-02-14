const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        require: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        require: true,
        allowNull: false
    },
    pass: {
        type: Sequelize.STRING,
        require: true,
        allowNull: false
    },
    typeUser: {
        type: Sequelize.INTEGER,
        require: true,
        allowNull: false
    }
}, {
    timestamps: false, // thuộc tính này để chặn chặn sequelize tự động sinh ra 2 cột dữ liệu, là sao.  khi chạy nó tạo rồi mà chạy lai nó tạo nữa àà
    // hông, từ từ
    //sao minh k call me cho lẹ????
    tableName: 'users' /// thuộc tính này để tên table tạo trên sequelize giống với trên xampp, gọn hơn là cái sequelize đó là gì?? 
        // Sequelize là orm node js để sử dụng mysql
        // ùm húm?, ùm húm gì hiểu không, tức là có nó mới sử dụng được dữ liệu trên sql ấy hả, ummm ọhm 
        // nói rõ hơn nhá : nếu mà có layout, ý là có file .ejs thì dùng module mysql của node cũng được, không cần dùng sequelize , hiểu hông
        // j mà module mysql, nó là qq j z, nhớ mấy câu lệnh SELECT, UPDATE ọ, nhớ, là nó đó hả, ừ, thằng mysql dùng mấy câu lệnh đấy
        /// sequelize thì hông dùng
        //oke  oke, tiếp tục
});
module.exports = User;
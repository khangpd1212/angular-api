const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createUser = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const typeUser = req.body.typeUser;
    console.log(email);
    User.findOne({ where: { email: email } })
        .then(user => {
            if (user) {
                console.log(user.email);
                return res.status(400).json({ message: "Mail đã tồn tại" });
            }
            return bcrypt.hash(password, 12);
        })
        .then(hashedPassword => {
            const user = new User({
                name: name,
                email: email,
                pass: hashedPassword,
                typeUser: typeUser
            });
            return user.save();
        })
        .then(user => {
            res.status(201).json({
                message: 'them thanh cong thanh vien',
                user: user
            });
        })
        .catch(err => res.status(400).json(err))
}

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ where: { email: email } })
        .then(user => {
            if (!user) {
                return res.status(400).json({ message: "Email không tồn tại" });
            }
            return Promise.all([bcrypt.compare(password, user.pass), user]);
        })
        .then(result => {
            const isMatch = result[0];
            const user = result[1];

            if (!isMatch) return res.status(400).json({ message: "Password không khớp" })
            const payload = {
                email: user.email,
                typeUser: user.typeUser
            }
            return jwt.sign(payload, "Vicky", { expiresIn: 3000 })
        })
        .then(token => {
            console.log(token);
            res.status(200).json({ message: "Login thành công", token })
        })
        .catch(err => res.status(400).json(err))
};

exports.testAuth = (req, res, next) => {
    res.status(200).json({
        message: "Logged in",
        user: req.user
    })
}
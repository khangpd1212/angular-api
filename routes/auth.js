const express = require('express');
const userController = require('../controllers/auth');
const { authenticate } = require("../middlewares/auth");
const router = express.Router();
router.post('/register', userController.createUser);
router.post('/login', userController.login);
router.get("/admin", authenticate, userController.testAuth);
// router.get('/profile', userController.testAuth);
module.exports = router
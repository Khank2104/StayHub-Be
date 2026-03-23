const express = require('express');
const { createUserController, loginController } = require('../controllers/authController');
const { verifyAdmin } = require('../middleware/auth');

const router = express.Router();

// Admin tạo User mới
router.post('/create-user', verifyAdmin, createUserController);

// Đăng nhập
router.post('/login', loginController);

module.exports = router;

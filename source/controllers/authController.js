const authService = require('../services/authService');

const createUserController = async (req, res) => {
  try {
    const newUser = await authService.createUser(req.body);
    res.status(201).json({
      message: 'Tạo tài khoản thành công',
      user: { id: newUser._id, username: newUser.username, fullName: newUser.fullName, phone: newUser.phone, role: newUser.role }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginController = async (req, res) => {
  try {
    const data = await authService.login(req.body);
    res.json({
      message: 'Đăng nhập thành công',
      token: data.token
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createUserController, loginController };

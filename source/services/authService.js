const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'doan_secret_key_123';

const createUser = async ({ username, password, fullName, phone, role }) => {
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new Error('Tài khoản đã tồn tại');
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    fullName,
    phone,
    password: hashedPassword,
    role: role || 'TENANT'
  });

  await newUser.save();
  return newUser;
};

const login = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('Sai tên đăng nhập hoặc mật khẩu');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Sai tên đăng nhập hoặc mật khẩu');
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: '1d' }
  );

  return { token };
};

module.exports = { createUser, login };

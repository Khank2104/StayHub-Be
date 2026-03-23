const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const authRoutes = require('./source/routes/auth');
const roomRoutes = require('./source/routes/rooms');
const tenantRoutes = require('./source/routes/tenants');
const User = require('./source/models/User');

const app = express();
const PORT = process.env.PORT || 5000;

// Hàm khởi tạo Admin mẫu (LANDLORD)
const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ username: 'admin@gmail.com' });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      const adminUser = new User({
        username: 'admin@gmail.com',
        fullName: 'Chủ Trọ Stayhub',
        phone: '0987654321',
        password: hashedPassword,
        role: 'LANDLORD'
      });
      await adminUser.save();
      console.log('✅ Hệ thống: Đã tạo tài khoản LANDLORD mặc định (admin / admin123)');
    }
  } catch (error) {
    console.error('❌ Lỗi khởi tạo LANDLORD:', error);
  }
};

mongoose.connect('mongodb://127.0.0.1:27017/doant6')
  .then(() => {
    console.log('✅ Connected to MongoDB');
    seedAdmin(); // Gọi hàm tạo admin sau khi db connect thành công
  })
  .catch(err => console.error('❌ Could not connect to MongoDB:', err));

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/tenants', tenantRoutes);

app.get('/', (req, res) => {
  res.send('Backend cho hệ thống Stayhub đang chạy (MVC Mode)!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

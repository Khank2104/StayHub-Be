const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^([a-zA-Z0-9.\-_]+@gmail\.com|[a-zA-Z0-9_]+)$/, 'Tài khoản đăng nhập phải là định dạng @gmail.com hoặc chữ viết liền không dấu']
  },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['LANDLORD', 'TENANT'], default: 'TENANT' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

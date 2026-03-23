const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: { 
    type: String, 
    required: true, 
    unique: true 
  },
  status: { 
    type: String, 
    enum: ['AVAILABLE', 'OCCUPIED', 'MAINTENANCE'],
    default: 'AVAILABLE' 
  },
  // Phân loại thẻ tiện ích (Tags)
  // VD: ['Có gác', 'Khu bếp', 'Máy lạnh', 'Ban công', ...]
  tags: {
    type: [String],
    default: []
  },
  // Giá thuê cơ bản (VNĐ/tháng)
  price: { 
    type: Number, 
    required: true 
  },
  // Số người tiêu chuẩn (không bị phụ phí)
  standardPersons: {
    type: Number,
    default: 1
  },
  // Phụ phí mỗi người khi vượt quá số tiêu chuẩn (VNĐ)
  extraPersonFee: {
    type: Number,
    default: 200000
  },
  floor: { type: Number },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);

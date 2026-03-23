const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  identityCard: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  email: { type: String },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  numberOfPersons: {
    type: Number,
    default: 1,
    min: [1, 'Số người phải ít nhất là 1']
  },
  deposit: { type: Number, default: 0 }
}, { timestamps: true });

// Khi dùng populate('room') thì virtual này sẽ tính dựa vào thông số của phòng
// Nếu chưa populate room, trả về 0
tenantSchema.virtual('surcharge').get(function () {
  if (!this.room || typeof this.room !== 'object') return 0;
  const extraPersons = this.numberOfPersons - (this.room.standardPersons || 1);
  return extraPersons > 0 ? extraPersons * (this.room.extraPersonFee || 200000) : 0;
});

tenantSchema.set('toJSON', { virtuals: true });
tenantSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Tenant', tenantSchema);

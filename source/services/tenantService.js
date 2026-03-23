const Tenant = require('../models/Tenant');
const Room = require('../models/Room');

const getAllTenants = async () => {
  return await Tenant.find().populate('room', 'roomNumber price status').sort({ createdAt: -1 });
};

const getTenantById = async (id) => {
  return await Tenant.findById(id).populate('room', 'roomNumber price status');
};

const createTenant = async (data) => {
  const newTenant = new Tenant(data);
  const savedTenant = await newTenant.save();
  // Khớp với Enum in HOA (Assignment Spec)
  if (data.room) await Room.findByIdAndUpdate(data.room, { status: 'OCCUPIED' });
  return savedTenant;
};

const updateTenant = async (id, data) => {
  return await Tenant.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const deleteTenant = async (id) => {
  const deletedTenant = await Tenant.findByIdAndDelete(id);
  // Khớp với Enum in HOA
  if (deletedTenant && deletedTenant.room) {
    await Room.findByIdAndUpdate(deletedTenant.room, { status: 'AVAILABLE' });
  }
  return deletedTenant;
};

module.exports = { getAllTenants, getTenantById, createTenant, updateTenant, deleteTenant };

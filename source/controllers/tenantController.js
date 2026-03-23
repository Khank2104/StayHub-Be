const tenantService = require('../services/tenantService');

const getAllTenants = async (req, res) => {
  try { res.json(await tenantService.getAllTenants()); }
  catch (error) { res.status(500).json({ message: 'Lỗi server', error: error.message }); }
};

const getTenantById = async (req, res) => {
  try {
    const tenant = await tenantService.getTenantById(req.params.id);
    if (!tenant) return res.status(404).json({ message: 'Không tìm thấy khách thuê' });
    res.json(tenant);
  } catch (error) { res.status(500).json({ message: 'Lỗi server', error: error.message }); }
};

const createTenant = async (req, res) => {
  try {
    const savedTenant = await tenantService.createTenant(req.body);
    res.status(201).json(savedTenant);
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ message: 'Số CCCD/CMND đã tồn tại' });
    res.status(400).json({ message: 'Lỗi dữ liệu', error: error.message });
  }
};

const updateTenant = async (req, res) => {
  try {
    const updatedTenant = await tenantService.updateTenant(req.params.id, req.body);
    if (!updatedTenant) return res.status(404).json({ message: 'Không tìm thấy khách thuê' });
    res.json(updatedTenant);
  } catch (error) { res.status(400).json({ message: 'Lỗi dữ liệu', error: error.message }); }
};

const deleteTenant = async (req, res) => {
  try {
    const deletedTenant = await tenantService.deleteTenant(req.params.id);
    if (!deletedTenant) return res.status(404).json({ message: 'Không tìm thấy khách thuê' });
    res.json({ message: 'Xóa khách thuê thành công' });
  } catch (error) { res.status(500).json({ message: 'Lỗi server', error: error.message }); }
};

module.exports = { getAllTenants, getTenantById, createTenant, updateTenant, deleteTenant };

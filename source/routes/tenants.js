const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenantController');
const { verifyToken } = require('../middleware/auth');

router.get('/', verifyToken, tenantController.getAllTenants);
router.get('/:id', verifyToken, tenantController.getTenantById);
router.post('/', verifyToken, tenantController.createTenant);
router.put('/:id', verifyToken, tenantController.updateTenant);
router.delete('/:id', verifyToken, tenantController.deleteTenant);

module.exports = router;

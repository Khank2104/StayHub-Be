const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const { verifyAdmin } = require('../middleware/auth'); // Mặc định verifyAdmin = yêu cầu LANDLORD

// Sử dụng Middleware verifyAdmin để đảm bảo chỉ Landlord có vòng gọi
router.get('/', verifyAdmin, roomController.getAllRooms);
router.get('/:id', verifyAdmin, roomController.getRoomById);
router.post('/', verifyAdmin, roomController.createRoom);
router.put('/:id', verifyAdmin, roomController.updateRoom);
router.delete('/:id', verifyAdmin, roomController.deleteRoom);

module.exports = router;

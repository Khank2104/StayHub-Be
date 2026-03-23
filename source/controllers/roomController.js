const roomService = require('../services/roomService');

// GET /api/rooms?tag=Máy lạnh&status=AVAILABLE&page=1
const getAllRooms = async (req, res) => {
  try {
    const { tag, status, page } = req.query;
    const result = await roomService.getAllRooms({ tag, status, page });
    res.json(result);
  } catch (error) { res.status(500).json({ message: 'Lỗi server', error: error.message }); }
};

const getRoomById = async (req, res) => {
  try {
    const room = await roomService.getRoomById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Không tìm thấy phòng' });
    res.json(room);
  } catch (error) { res.status(500).json({ message: 'Lỗi server', error: error.message }); }
};

const createRoom = async (req, res) => {
  try {
    const savedRoom = await roomService.createRoom(req.body);
    res.status(201).json(savedRoom);
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ message: 'Số phòng đã tồn tại' });
    res.status(400).json({ message: 'Lỗi dữ liệu', error: error.message });
  }
};

const updateRoom = async (req, res) => {
  try {
    const updatedRoom = await roomService.updateRoom(req.params.id, req.body);
    if (!updatedRoom) return res.status(404).json({ message: 'Không tìm thấy phòng' });
    res.json(updatedRoom);
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ message: 'Số phòng đã tồn tại' });
    res.status(400).json({ message: 'Lỗi dữ liệu', error: error.message });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const deletedRoom = await roomService.deleteRoom(req.params.id);
    if (!deletedRoom) return res.status(404).json({ message: 'Không tìm thấy phòng' });
    res.json({ message: 'Xóa phòng thành công' });
  } catch (error) {
    if (error.message.includes('xóa phòng trống')) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

module.exports = { getAllRooms, getRoomById, createRoom, updateRoom, deleteRoom };

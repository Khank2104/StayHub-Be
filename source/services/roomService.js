const Room = require('../models/Room');

const PAGE_SIZE = 6; // Số phòng trên 1 trang

const getAllRooms = async ({ tag, status, page = 1 }) => {
  const filter = {};

  // Lọc theo tag tiện ích (VD: ?tag=Máy lạnh)
  if (tag) {
    filter.tags = { $in: [tag] };
  }

  // Lọc theo trạng thái (VD: ?status=AVAILABLE)
  if (status) {
    filter.status = status;
  }

  const skip = (page - 1) * PAGE_SIZE;
  const total = await Room.countDocuments(filter);
  const rooms = await Room.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(PAGE_SIZE);

  return {
    data: rooms,
    pagination: {
      total,
      page: Number(page),
      pageSize: PAGE_SIZE,
      totalPages: Math.ceil(total / PAGE_SIZE)
    }
  };
};

const getRoomById = async (id) => {
  return await Room.findById(id);
};

const createRoom = async (data) => {
  const newRoom = new Room(data);
  return await newRoom.save();
};

const updateRoom = async (id, data) => {
  return await Room.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const deleteRoom = async (id) => {
  const room = await Room.findById(id);
  if (!room) return null;
  if (room.status !== 'AVAILABLE') {
    throw new Error('Chỉ có thể xóa phòng trống (AVAILABLE)');
  }
  return await Room.findByIdAndDelete(id);
};

module.exports = { getAllRooms, getRoomById, createRoom, updateRoom, deleteRoom };

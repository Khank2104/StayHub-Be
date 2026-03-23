const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'doan_secret_key_123';

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Truy cập bị từ chối. Không tìm thấy token.' });

  try {
    const verified = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token không hợp lệ.' });
  }
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 'LANDLORD') {
      next();
    } else {
      res.status(403).json({ message: 'Chỉ LANDLORD mới có quyền thực hiện hành động này!' });
    }
  });
};

module.exports = { verifyToken, verifyAdmin };

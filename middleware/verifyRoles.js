// middlewares/verifyRoles.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyRoles = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      if (!allowedRoles.includes(decoded.role_id)) {
        return res.status(403).json({ message: 'Access denied. Required role not found' });
      }

      req.user = decoded;
      next();
    } catch (err) {
      console.error('Token verification error:', err);
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};

module.exports = verifyRoles;
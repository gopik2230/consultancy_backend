// middlewares/clientMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyClientToken = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user has client role (role_id = 2)
    if (decoded.role_id !== 2) {
      return res.status(403).json({ message: 'Access denied. Client role required' });
    }

    // Attach user data to request
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = verifyClientToken;
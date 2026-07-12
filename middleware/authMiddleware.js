const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect private routes (Ensures user is logged in)
exports.protect = async (req, res, next) => {
  let token;

  // Read token from the incoming request Authorization Header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
  }

  try {
    // Verify token identity
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'veloce_secret_key_123');
    
    // Fetch user profile from database and attach it to the request object
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Token authorization failed' });
  }
};

// Middleware to restrict access to specific roles (e.g., 'admin' only)
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        error: `User role '${req.user?.role || 'none'}' is not authorized to access this route` 
      });
    }
    next();
  };
};
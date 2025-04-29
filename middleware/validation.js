// middlewares/validation.js
exports.validateSignup = (req, res, next) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }
  
    // Add more validation logic as needed (e.g., email format, password strength)
    
    next(); // Proceed to the next middleware or controller
  };
  
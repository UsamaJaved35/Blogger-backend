const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  console.log(req.headers)
console.log(req.headers.authorization)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({message:'You are Not authorized'});
    }
  }

  if (!token) {
    res.status(401).json({message:'You are Not authorized'});
  }
};

module.exports = { protect };

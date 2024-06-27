const { check, validationResult } = require('express-validator');
const errorResponse = require('../utils/errorResponse')

const validateUserRegistration = [
  check('username').notEmpty().withMessage('Username is required'),
  check('email').isEmail().withMessage('Valid email is required'),
  check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => error.msg);
      console.log(errorMessages);
      return errorResponse(res, 400, errorMessages);
      // return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateUserLogin = [
  check('email').isEmail().withMessage('Valid email is required'),
  check('password').notEmpty().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => error.msg);
      return errorResponse(res, 400, errorMessages);
      //return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateUserRegistration, validateUserLogin };

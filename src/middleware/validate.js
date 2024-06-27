const { validationResult } = require('express-validator');
const errorResponse = require('../utils/errorResponse')

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return errorResponse(res, 400, errorMessages);
  }
  next();
};

module.exports = validate;

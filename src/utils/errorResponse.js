const errorResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({
      success: false,
      error: {
        code: statusCode,
        message,
      },
    });
  };
  
module.exports = errorResponse;
  
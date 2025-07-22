

const successResponse = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  });
};


const errorResponse = (res, message = 'Internal Server Error', statusCode = 500, errors = null) => {
  const response = {
    success: false,
    message,
    timestamp: new Date().toISOString(),
  };

  if (errors) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};


const validationErrorResponse = (res, validationErrors, message = 'Validation failed') => {
  return res.status(400).json({
    success: false,
    message,
    errors: validationErrors.map(error => ({
      field: error.param,
      message: error.msg,
      value: error.value,
    })),
    timestamp: new Date().toISOString(),
  });
};


const paginatedResponse = (res, data, pagination, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    pagination: {
      currentPage: pagination.currentPage,
      totalPages: pagination.totalPages,
      totalItems: pagination.totalItems,
      itemsPerPage: pagination.itemsPerPage,
      hasNextPage: pagination.hasNextPage,
      hasPrevPage: pagination.hasPrevPage,
    },
    timestamp: new Date().toISOString(),
  });
};


const unauthorizedResponse = (res, message = 'Unauthorized access') => {
  return res.status(401).json({
    success: false,
    message,
    timestamp: new Date().toISOString(),
  });
};


const forbiddenResponse = (res, message = 'Access forbidden') => {
  return res.status(403).json({
    success: false,
    message,
    timestamp: new Date().toISOString(),
  });
};


const notFoundResponse = (res, message = 'Resource not found') => {
  return res.status(404).json({
    success: false,
    message,
    timestamp: new Date().toISOString(),
  });
};


export {
    successResponse,
    errorResponse,
    validationErrorResponse,
    paginatedResponse,
    unauthorizedResponse,
    forbiddenResponse,
    notFoundResponse
} 
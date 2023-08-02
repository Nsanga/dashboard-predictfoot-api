/**
 * Create a success response object.
 * @param {object} data - The data to be included in the response.
 * @param {string} message - The success message (default: 'Success').
 * @param {number} statusCode - The status code of the response (default: 200).
 * @returns {object} - The success response object.
 */
function successResponse(data, message = 'Success', statusCode = 200) {
  return {
    success: true,
    message,
    data,
    statusCode,
  };
}

/**
 * Create an error response object.
 * @param {string} message - The error message (default: 'Error').
 * @param {number} statusCode - The status code of the response (default: 500).
 * @returns {object} - The error response object.
 */
function errorResponse(message = 'Error', statusCode = 500) {
  return {
    success: false,
    message,
    data: null,
    statusCode,
  };
}

/**
 * Create a custom response object.
 * @param {boolean} success - The success status of the response.
 * @param {string} message - The response message (default: 'Success' for success, 'Error' for failure).
 * @param {object} data - The data to be included in the response (default: null).
 * @param {number} statusCode - The status code of the response (default: 200 for success, 500 for failure).
 * @returns {object} - The custom response object.
 */
function customResponse(success, message, data = null, statusCode = success ? 200 : 500) {
  return {
    success,
    message: message || (success ? 'Success' : 'Error'),
    data,
    statusCode,
  };
}

// Export the successResponse, errorResponse, and customResponse functions to be used in other files.
module.exports = {
  successResponse,
  errorResponse,
  customResponse,
};

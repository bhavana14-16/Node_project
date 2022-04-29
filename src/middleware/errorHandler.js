
const { ValidationError } = require('joi');
const CustomErrorHandler = require('../services/CustomErrorHandler');

const errorHandler = (error, req, res, next) => {

    let statusCode = 500;
    let data = { status: "failure", Message: error.message }

    // Validation Error
    if (error instanceof ValidationError) {
        statusCode = 400;
        data = { status: "failure", Message: error.message }
    }

    // Custom Error
    if (error instanceof CustomErrorHandler) {
        statusCode = error.status;
        data = { status: "failure", Message: error.message }
    }

    res.status(statusCode).json(data);
}

module.exports = errorHandler;
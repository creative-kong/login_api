import ErrorResponse from "../utils/errorResponse.js";

const  errorHandler = (err, req, res, next) => {
    let error = { ...err }
    error.message = err.message

    res.status(error.statusCode || 500).json({
        data : [],
        success : false,
        error : error.message || 'server error'
    })
}

export default errorHandler
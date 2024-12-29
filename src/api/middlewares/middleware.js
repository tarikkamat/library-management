/**
 * Error handling middleware
 * This middleware catches errors and sends a consistent error response.
 */
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
        },
    });
};

/**
 * Not found middleware
 * This middleware handles undefined routes.
 */
const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        error: {
            message: 'Resource not found',
        },
    });
};

/**
 * Logger middleware
 * Logs information about each incoming request.
 */
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
};

module.exports = {
    errorHandler,
    notFoundHandler,
    logger,
};
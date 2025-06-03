import { Request, Response, NextFunction } from 'express';

export interface CustomError extends Error {
    statusCode?: number;
    isOperational?: boolean;
}

export const errorHandler = (
    error: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = error.statusCode || 500;
    let message = error.message || 'Internal Server Error';

    // Mongoose validation error
    if (error.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation Error';
    }

    // Mongoose duplicate error
    if (error.name === 'MongoError' && (error as any).code === 11000) {
        statusCode = 400;
        message = 'Duplicate field value';
    }

    // JWT errors
    if (error.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
    }

    if (error.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired';
    }

    console.error(`Error ${statusCode}: ${message}`, error);

    res.status(statusCode).json({
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
    });
};
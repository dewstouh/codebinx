import { body, param, query, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            message: 'Validation failed',
            errors: errors.array(),
        });
        return;
    }
    next();
};

export const validateRegister = [
    body('username')
        .isLength({ min: 3, max: 30 })
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('Username must be 3-30 characters and contain only letters, numbers, and underscores'),
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Valid email is required'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    handleValidationErrors,
];

export const validateLogin = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Valid email is required'),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
    handleValidationErrors,
];

export const validateCreateBin = [
    body('title')
        .isLength({ min: 1, max: 100 })
        .trim()
        .withMessage('Title must be 1-100 characters'),
    body('content')
        .isLength({ min: 1 })
        .withMessage('Content is required'),
    body('description')
        .optional()
        .isLength({ max: 500 })
        .trim()
        .withMessage('Description must be max 500 characters'),
    body('language')
        .optional()
        .isString()
        .trim(),
    body('isPrivate')
        .optional()
        .isBoolean(),
    body('password')
        .optional()
        .isString(),
    handleValidationErrors,
];

export const validateBinId = [
    param('binId')
        .isLength({ min: 10, max: 10 })
        .withMessage('Invalid bin ID'),
    handleValidationErrors,
];
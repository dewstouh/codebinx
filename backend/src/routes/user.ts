import { Router } from 'express';
import { UserController } from '@/controllers/userController';
import { authenticate } from '@/middleware/auth';
import { body } from 'express-validator';
import { handleValidationErrors } from '@/middleware/validation';

const router: Router = Router();
const userController = new UserController();

const validateUpdateProfile = [
    body('username')
        .optional()
        .isLength({ min: 3, max: 30 })
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('Username must be 3-30 characters and contain only letters, numbers, and underscores'),
    body('email')
        .optional()
        .isEmail()
        .normalizeEmail()
        .withMessage('Valid email is required'),
    handleValidationErrors,
];

// Update profile
router.put('/profile', authenticate, validateUpdateProfile, userController.updateProfile);

// Get user statistics
router.get('/stats', authenticate, userController.getStats);

// Delete account
router.delete('/account', authenticate, userController.deleteAccount);

export default router;
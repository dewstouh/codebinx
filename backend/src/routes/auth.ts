import { Router } from 'express';
import passport from 'passport';
import { AuthController } from '@/controllers/authController';
import { authenticate } from '@/middleware/auth';
import { validateRegister, validateLogin } from '@/middleware/validation';

const router = Router();
const authController = new AuthController();

// Register
router.post('/register', validateRegister, authController.register);

// Login
router.post('/login', validateLogin, authController.login);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), authController.googleCallback);

// Profile
router.get('/profile', authenticate, authController.getProfile);

export default router;
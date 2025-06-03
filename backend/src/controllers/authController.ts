import { Request, Response, NextFunction } from 'express';
import { AuthService } from '@/services/authService';

const authService = new AuthService();

export class AuthController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, email, password } = req.body;
            const result = await authService.register(username, email, password);

            res.status(201).json({
                message: 'User registered successfully',
                ...result,
            });
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const result = await authService.login(email, password);

            res.json({
                message: 'Login successful',
                ...result,
            });
        } catch (error) {
            next(error);
        }
    }

    async googleCallback(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.user) {
                return res.redirect(`${process.env.CORS_ORIGIN}/login?error=auth_failed`);
            }

            const token = authService.generateToken(req.user._id);
            res.redirect(`${process.env.CORS_ORIGIN}/login?token=${token}`);
        } catch (error) {
            next(error);
        }
    }

    async getProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await authService.getProfile(req.user!._id);
            res.json({ user });
        } catch (error) {
            next(error);
        }
    }
}
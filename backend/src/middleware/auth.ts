import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { IUser } from '@/types/user';

declare global {
    namespace Express {
        interface User extends IUser { }
    }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (err: any, user: IUser) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user;
        next();
    })(req, res, next);
};

export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (err: any, user: IUser) => {
        if (err) {
            return next(err);
        }
        if (user) {
            req.user = user;
        }
        next();
    })(req, res, next);
};
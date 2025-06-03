import { Request, Response, NextFunction } from 'express';
import User from '@/models/User';
import Bin from '@/models/Bin';

export class UserController {
    async updateProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, email } = req.body;
            const userId = req.user!._id;

            // Check if username or email already exists (excluding current user)
            const existingUser = await User.findOne({
                $and: [
                    { _id: { $ne: userId } },
                    { $or: [{ username }, { email }] }
                ]
            });

            if (existingUser) {
                res.status(400).json({ message: 'Username or email already exists' });
                return
            }

            const user = await User.findByIdAndUpdate(
                userId,
                { username, email },
                { new: true, runValidators: true }
            ).select('-password');

            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return
            }

            res.json({
                message: 'Profile updated successfully',
                user,
            });
        } catch (error) {
            next(error);
        }
    }

    async getStats(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user!._id;

            const [totalBins, totalViews, privateBins] = await Promise.all([
                Bin.countDocuments({ author: userId }),
                Bin.aggregate([
                    { $match: { author: userId } },
                    { $group: { _id: null, totalViews: { $sum: '$views' } } }
                ]),
                Bin.countDocuments({ author: userId, isPrivate: true }),
            ]);

            res.json({
                stats: {
                    totalBins,
                    totalViews: totalViews[0]?.totalViews || 0,
                    privateBins,
                    publicBins: totalBins - privateBins,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteAccount(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user!._id;
            const { password } = req.body;

            const user = await User.findById(userId);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            // Verify password for regular users
            if (user.password && password) {
                const isPasswordValid = await user.comparePassword(password);
                if (!isPasswordValid) {
                    res.status(400).json({ message: 'Invalid password' });
                    return;
                }
            }

            // Delete user's bins
            await Bin.deleteMany({ author: userId });

            // Delete user account
            await User.findByIdAndDelete(userId);

            res.json({ message: 'Account deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}
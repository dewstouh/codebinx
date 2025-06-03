import jwt from 'jsonwebtoken';
import User from '@/models/User';
import { IUser, IUserResponse } from '@/types/user';

export class AuthService {
    public generateToken(userId: string): string {
        const secret: jwt.Secret = process.env.JWT_SECRET || 'fallback-secret';
        const expiresIn = (process.env.JWT_EXPIRES_IN || '7d') as jwt.SignOptions['expiresIn'];
        const options: jwt.SignOptions = { expiresIn };
        return jwt.sign(
            { id: userId },
            secret,
            options
        );
    }

    private formatUserResponse(user: IUser): IUserResponse {
        return {
            id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            isVerified: user.isVerified,
            createdAt: user.createdAt,
        };
    }

    async register(username: string, email: string, password: string) {
        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        });

        if (existingUser) {
            throw new Error('User already exists');
        }

        // Create new user
        const user = new User({
            username,
            email,
            password,
        });

        await user.save();

        const token = this.generateToken(user._id);
        const userResponse = this.formatUserResponse(user);

        return { user: userResponse, token };
    }

    async login(email: string, password: string) {
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid credentials');
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        const token = this.generateToken(user._id);
        const userResponse = this.formatUserResponse(user);

        return { user: userResponse, token };
    }

    async getProfile(userId: string) {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        return this.formatUserResponse(user);
    }
}
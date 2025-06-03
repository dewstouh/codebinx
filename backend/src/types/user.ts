import { Document } from 'mongoose';

export interface IUser extends Document {
    _id: string;
    username: string;
    email: string;
    password?: string;
    googleId?: string;
    avatar?: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUserResponse {
    id: string;
    username: string;
    email: string;
    avatar?: string;
    isVerified: boolean;
    createdAt: Date;
}
import { Document } from 'mongoose';

export interface IBin extends Document {
    _id: string;
    binId: string;
    title: string;
    description?: string;
    content: string;
    language: string;
    isPrivate: boolean;
    password?: string;
    author?: string;
    views: number;
    expiresAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IBinResponse {
    id: string;
    binId: string;
    title: string;
    description?: string;
    content: string;
    language: string;
    isPrivate: boolean;
    hasPassword: boolean;
    author?: {
        id: string;
        username: string;
        avatar?: string;
    };
    views: number;
    expiresAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
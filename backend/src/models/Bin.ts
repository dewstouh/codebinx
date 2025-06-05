import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import { IBin } from '@codebinx/shared';

const BinSchema = new Schema<IBin>({
    binId: {
        type: String,
        unique: true,
        default: () => nanoid(10),
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    description: {
        type: String,
        trim: true,
        maxlength: 500,
    },
    content: {
        type: String,
        required: true,
        maxlength: parseInt(process.env.MAX_BIN_SIZE || '1048576'), // 1MB default
    },
    language: {
        type: String,
        default: 'text',
        trim: true,
    },
    isPrivate: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    views: {
        type: Number,
        default: 0,
    },
    expiresAt: {
        type: Date,
        default: () => {
            const days = parseInt(process.env.DEFAULT_BIN_EXPIRY_DAYS || '30');
            return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
        },
    },
}, {
    timestamps: true,
});

// Password hashing middleware
BinSchema.pre('save', async function (next) {
    if (!this.isModified('password') || !this.password) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error as Error);
    }
});

// Compare password method
BinSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    if (!this.password) return false;
    return bcrypt.compare(candidatePassword, this.password);
};

BinSchema.index({ author: 1 });
BinSchema.index({ createdAt: -1 });
BinSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model<IBin>('Bin', BinSchema);
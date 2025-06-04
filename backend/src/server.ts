import 'dotenv/config'
import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import passport from 'passport';
import { errorHandler } from '@/middleware/errorHandler';
import { notFound } from '@/middleware/notFound';
import authRoutes from '@/routes/auth';
import binRoutes from '@/routes/bin';
import userRoutes from '@/routes/user';
import { connectDatabase } from '@/config/database';
import '@/config/passport';

const app:Application = express();
const PORT = process.env.PORT || 3000;

// Rate limiting
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
// app.use(limiter);
app.use(passport.initialize());

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bins', binRoutes);
app.use('/api/users', userRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
const startServer = async () => {
    try {
        await connectDatabase();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`📊 Environment: ${process.env.NODE_ENV}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

export default app;
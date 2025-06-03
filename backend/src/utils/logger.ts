import { createWriteStream } from 'fs';
import { join } from 'path';

export class Logger {
    private static instance: Logger;
    private logStream: NodeJS.WritableStream;

    private constructor() {
        this.logStream = createWriteStream(join(__dirname, '../../logs/app.log'), { flags: 'a' });
    }

    static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    log(level: 'info' | 'error' | 'warn', message: string, meta?: any) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            level,
            message,
            ...(meta && { meta }),
        };

        console.log(`[${timestamp}] ${level.toUpperCase()}: ${message}`);
        this.logStream.write(JSON.stringify(logEntry) + '\n');
    }

    info(message: string, meta?: any) {
        this.log('info', message, meta);
    }

    error(message: string, meta?: any) {
        this.log('error', message, meta);
    }

    warn(message: string, meta?: any) {
        this.log('warn', message, meta);
    }
}
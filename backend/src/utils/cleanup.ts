import cron from 'node-cron';
import Bin from '@/models/Bin';
import { Logger } from '@/utils/logger';

const logger = Logger.getInstance();

// Clean up expired bins daily at 2 AM
export const startCleanupJob = () => {
    cron.schedule('0 2 * * *', async () => {
        try {
            const result = await Bin.deleteMany({
                expiresAt: { $lt: new Date() }
            });

            logger.info(`Cleanup job completed: ${result.deletedCount} expired bins deleted`);
        } catch (error) {
            logger.error('Cleanup job failed', error);
        }
    });

    logger.info('Cleanup job scheduled');
};
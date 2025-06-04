import { Router } from 'express';
import { BinController } from '@/controllers/binController';
import { authenticate, optionalAuth } from '@/middleware/auth';
import { validateCreateBin, validateBinId } from '@/middleware/validation';

const router:Router = Router();
const binController = new BinController();

// Create bin
router.post('/', optionalAuth, validateCreateBin, binController.createBin);
router.get('/', optionalAuth, binController.getBins);

// Get bin
router.get('/:binId', validateBinId, optionalAuth, binController.getBin);
router.post('/:binId', validateBinId, optionalAuth, binController.getBin); // For password-protected bins

// User bins (authenticated routes)
router.get('/user/bins', authenticate, binController.getUserBins);
router.put('/:binId', authenticate, validateBinId, binController.updateBin);
router.delete('/:binId', authenticate, validateBinId, binController.deleteBin);

export default router;
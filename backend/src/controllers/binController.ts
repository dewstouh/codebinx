import { Request, Response, NextFunction } from 'express';
import { BinService } from '@/services/binService';
import Bin from '@/models/Bin';

const binService = new BinService();

export class BinController {
    async createBin(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, content, description, language, isPrivate, password } = req.body;

            const bin = await binService.createBin({
                title,
                content,
                description,
                language,
                isPrivate,
                password,
                authorId: req.user?._id,
            });

            res.status(201).json({
                message: 'Bin created successfully',
                bin,
            });
        } catch (error) {
            next(error);
        }
    }

    async getBin(req: Request, res: Response, next: NextFunction) {
        try {
            const { binId } = req.params;
            const { password } = req.body;

            const bin = await binService.getBin(binId, password, req.user?._id);

            res.json({ bin });
        } catch (error) {
            next(error);
        }
    }

    async getUserBins(req: Request, res: Response, next: NextFunction) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            const result = await binService.getUserBins(req.user!._id, page, limit);

            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async updateBin(req: Request, res: Response, next: NextFunction) {
        try {
            const { binId } = req.params;
            const updates = req.body;

            const bin = await binService.updateBin(binId, req.user!._id, updates);

            res.json({
                message: 'Bin updated successfully',
                bin,
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteBin(req: Request, res: Response, next: NextFunction) {
        try {
            const { binId } = req.params;

            const result = await binService.deleteBin(binId, req.user!._id);

            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async checkPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { binId } = req.params;
            const bin = await Bin.findOne({ binId }).select('password');

            if (!bin) {
                res.status(404).json({ message: 'Bin not found' });
                return;
            }

            res.json({ hasPassword: !!bin.password });
        } catch (error) {
            next(error);
        }
    }
}
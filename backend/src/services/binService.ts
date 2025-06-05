import Bin from '@/models/Bin';
import User from '@/models/User';
import { IBin, IBinResponse } from '@codebinx/shared';

export class BinService {
    private async formatBinResponse(bin: IBin, includeContent: boolean = true): Promise<IBinResponse> {
        const response: IBinResponse = {
            id: bin._id,
            binId: bin.binId,
            title: bin.title,
            description: bin.description,
            content: includeContent ? bin.content : '',
            language: bin.language,
            isPrivate: bin.isPrivate,
            hasPassword: !!bin.password,
            views: bin.views,
            expiresAt: bin.expiresAt,
            createdAt: bin.createdAt,
            updatedAt: bin.updatedAt,
        };

        if (bin.author) {
            const author = await User.findById(bin.author).select('username avatar');
            if (author) {
                response.author = {
                    id: author._id,
                    username: author.username,
                    avatar: author.avatar,
                };
            }
        }

        return response;
    }

    async createBin(data: {
        title: string;
        content: string;
        description?: string;
        language?: string;
        isPrivate?: boolean;
        password?: string;
        authorId?: string;
    }) {
        const bin = new Bin({
            title: data.title,
            content: data.content,
            description: data.description,
            language: data.language || 'text',
            isPrivate: data.isPrivate || false,
            password: data.password,
            author: data.authorId,
        });

        await bin.save();
        return this.formatBinResponse(bin);
    }

    async getBin(binId: string, password?: string, userId?: string) {
        const bin = await Bin.findOne({ binId });

        if (!bin) {
            throw new Error('Bin not found');
        }

        // Check if bin is private and user is not the author
        if (bin.isPrivate && (!userId || bin.author?.toString() !== userId)) {
            throw new Error('Bin not found');
        }

        // Check password if required
        if (bin.password) {
            if (!password) {
                throw new Error('Password required');
            }

            const isPasswordValid = await bin.comparePassword(password);
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }
        }

        // Increment views
        bin.views += 1;
        await bin.save();

        return this.formatBinResponse(bin);
    }

    async getUserBins(userId: string, page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;

        const bins = await Bin.find({ author: userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Bin.countDocuments({ author: userId });

        const formattedBins = await Promise.all(
            bins.map(bin => this.formatBinResponse(bin as IBin, false))
        );

        return {
            bins: formattedBins,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }

    async getBins(page: number = 1, limit: number = 10, filter = {}){
        const skip = (page - 1) * limit;

        const bins = await Bin.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Bin.countDocuments(filter);

        const formattedBins = await Promise.all(
            bins.map(bin => this.formatBinResponse(bin as IBin, false))
        );

        return {
            bins: formattedBins,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    } 

    async updateBin(binId: string, userId: string, updates: Partial<{
        title: string;
        description: string;
        content: string;
        language: string;
        isPrivate: boolean;
        password: string;
    }>) {
        const bin = await Bin.findOne({ binId, author: userId });

        if (!bin) {
            throw new Error('Bin not found or unauthorized');
        }

        Object.assign(bin, updates);
        await bin.save();

        return this.formatBinResponse(bin);
    }

    async deleteBin(binId: string, userId: string) {
        const result = await Bin.deleteOne({ binId, author: userId });

        if (result.deletedCount === 0) {
            throw new Error('Bin not found or unauthorized');
        }

        return { message: 'Bin deleted successfully' };
    }
}
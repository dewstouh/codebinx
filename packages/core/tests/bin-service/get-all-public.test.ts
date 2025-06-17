// tests/bin-service/get-all-public.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { mockPrisma, resetAllMocks } from '../setup/bin-service'
import { BinService } from '@codebinx/core'

describe('BinService.getAllPublicBinsWithAuthor', () => {
    beforeEach(() => {
        resetAllMocks()
    })

    it('should return all public bins without passwords', async () => {
        const mockBins = [
            {
                id: 1,
                binId: 'bin1',
                title: 'Public Bin 1',
                content: 'console.log("hello")',
                language: 'javascript',
                isPrivate: false,
                password: null,
                author: { id: 'user1', name: 'User One', email: 'user1@example.com' },
                createdAt: new Date('2024-01-01'),
            },
            {
                id: 2,
                binId: 'bin2',
                title: 'Public Bin 2',
                content: 'print("world")',
                language: 'python',
                isPrivate: false,
                password: null,
                author: { id: 'user2', name: 'User Two', email: 'user2@example.com' },
                createdAt: new Date('2024-01-02'),
            },
        ]

        mockPrisma.bin.findMany.mockResolvedValue(mockBins)

        const result = await BinService.getAllPublicBinsWithAuthor()

        expect(mockPrisma.bin.findMany).toHaveBeenCalledWith({
            where: {
                isPrivate: false,
                password: null,
            },
            include: { author: true },
        })
        expect(result).toEqual(mockBins)
    })

    it('should return empty array when no public bins exist', async () => {
        mockPrisma.bin.findMany.mockResolvedValue([])

        const result = await BinService.getAllPublicBinsWithAuthor()

        expect(result).toEqual([])
        expect(mockPrisma.bin.findMany).toHaveBeenCalledOnce()
    })

    it('should call prisma with correct filters', async () => {
        mockPrisma.bin.findMany.mockResolvedValue([])

        await BinService.getAllPublicBinsWithAuthor()

        expect(mockPrisma.bin.findMany).toHaveBeenCalledWith({
            where: {
                isPrivate: false,
                password: null,
            },
            include: { author: true },
        })
    })

    it('should include author information in results', async () => {
        const mockBins = [
            {
                id: 1,
                binId: 'bin1',
                title: 'Test Bin',
                isPrivate: false,
                password: null,
                author: {
                    id: 'user1',
                    name: 'John Doe',
                    email: 'john@example.com',
                    clerkId: 'clerk_123'
                },
            },
        ]

        mockPrisma.bin.findMany.mockResolvedValue(mockBins)

        const result = await BinService.getAllPublicBinsWithAuthor()

        expect(result[0]).toHaveProperty('author')
        expect(result[0].author).toEqual({
            id: 'user1',
            name: 'John Doe',
            email: 'john@example.com',
            clerkId: 'clerk_123'
        })
    })
})
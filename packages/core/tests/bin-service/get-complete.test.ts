// tests/bin-service/get-complete.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { mockPrisma, resetAllMocks } from '../setup/bin-service'
import { BinService } from '@codebinx/core'

describe('BinService.getComplete', () => {
    beforeEach(() => {
        resetAllMocks()
    })

    it('should return complete bin data with comments', async () => {
        const mockBin = {
            id: 1,
            binId: 'abc123defg',
            title: 'Test Bin',
            content: 'console.log("hello")',
            language: 'javascript',
            isPrivate: false,
            password: 'hashedpassword',
            authorId: 'user123',
            createdAt: new Date('2024-01-01'),
            author: { id: 'user123', name: 'John Doe', email: 'john@example.com' },
        }

        const mockComments = [
            {
                id: 1,
                content: 'Great code!',
                targetId: 1,
                targetType: 'bin',
                authorId: 'user456',
                author: { id: 'user456', name: 'Jane Doe', email: 'jane@example.com' },
                createdAt: new Date('2024-01-02'),
            },
            {
                id: 2,
                content: 'Nice work',
                targetId: 1,
                targetType: 'bin',
                authorId: 'user789',
                author: { id: 'user789', name: 'Bob Smith', email: 'bob@example.com' },
                createdAt: new Date('2024-01-01'),
            },
        ]

        mockPrisma.bin.findUnique.mockResolvedValue(mockBin)
        mockPrisma.comment.findMany.mockResolvedValue(mockComments)

        const result = await BinService.getComplete('abc123defg')

        expect(mockPrisma.bin.findUnique).toHaveBeenCalledWith({
            where: { binId: 'abc123defg' },
            include: { author: true },
        })

        expect(mockPrisma.comment.findMany).toHaveBeenCalledWith({
            where: {
                targetId: 1,
                targetType: 'bin',
            },
            include: { author: true },
            orderBy: { createdAt: 'desc' },
        })

        expect(result).toEqual({
            id: 1,
            binId: 'abc123defg',
            title: 'Test Bin',
            content: 'console.log("hello")',
            language: 'javascript',
            isPrivate: false,
            authorId: 'user123',
            createdAt: new Date('2024-01-01'),
            author: { id: 'user123', name: 'John Doe', email: 'john@example.com' },
            hasPassword: true,
            comments: mockComments,
        })
    })

    it('should return null if bin not found', async () => {
        mockPrisma.bin.findUnique.mockResolvedValue(null)

        const result = await BinService.getComplete('nonexistent')

        expect(result).toBeNull()
        expect(mockPrisma.comment.findMany).not.toHaveBeenCalled()
    })

    it('should indicate hasPassword as false when no password', async () => {
        const mockBin = {
            id: 1,
            binId: 'abc123defg',
            title: 'Test Bin',
            content: 'console.log("hello")',
            password: null,
            author: { id: 'user123', name: 'John Doe' },
        }

        mockPrisma.bin.findUnique.mockResolvedValue(mockBin)
        mockPrisma.comment.findMany.mockResolvedValue([])

        const result = await BinService.getComplete('abc123defg')

        expect(result?.hasPassword).toBe(false)
        expect(result).not.toHaveProperty('password')
    })

    it('should indicate hasPassword as false when password is empty string', async () => {
        const mockBin = {
            id: 1,
            binId: 'abc123defg',
            title: 'Test Bin',
            password: '',
            author: { id: 'user123', name: 'John Doe' },
        }

        mockPrisma.bin.findUnique.mockResolvedValue(mockBin)
        mockPrisma.comment.findMany.mockResolvedValue([])

        const result = await BinService.getComplete('abc123defg')

        expect(result?.hasPassword).toBe(false)
    })

    it('should return bin with empty comments array when no comments exist', async () => {
        const mockBin = {
            id: 1,
            binId: 'abc123defg',
            title: 'Test Bin',
            password: null,
            author: { id: 'user123', name: 'John Doe' },
        }

        mockPrisma.bin.findUnique.mockResolvedValue(mockBin)
        mockPrisma.comment.findMany.mockResolvedValue([])

        const result = await BinService.getComplete('abc123defg')

        expect(result?.comments).toEqual([])
    })

    it('should exclude password from returned data', async () => {
        const mockBin = {
            id: 1,
            binId: 'abc123defg',
            title: 'Test Bin',
            password: 'hashedpassword123',
            author: { id: 'user123', name: 'John Doe' },
        }

        mockPrisma.bin.findUnique.mockResolvedValue(mockBin)
        mockPrisma.comment.findMany.mockResolvedValue([])

        const result = await BinService.getComplete('abc123defg')

        expect(result).not.toHaveProperty('password')
        expect(result?.hasPassword).toBe(true)
    })

    it('should order comments by createdAt desc', async () => {
        const mockBin = {
            id: 1,
            binId: 'abc123defg',
            password: null,
            author: { id: 'user123', name: 'John Doe' },
        }

        mockPrisma.bin.findUnique.mockResolvedValue(mockBin)
        mockPrisma.comment.findMany.mockResolvedValue([])

        await BinService.getComplete('abc123defg')

        expect(mockPrisma.comment.findMany).toHaveBeenCalledWith({
            where: {
                targetId: 1,
                targetType: 'bin',
            },
            include: { author: true },
            orderBy: { createdAt: 'desc' },
        })
    })
})
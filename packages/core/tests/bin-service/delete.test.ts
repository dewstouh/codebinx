// tests/bin-service/delete.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { mockPrisma, resetAllMocks } from '../setup/bin-service'
import { BinService } from '@codebinx/core'

describe('BinService.delete', () => {
    beforeEach(() => {
        resetAllMocks()
    })

    it('should delete bin successfully', async () => {
        const mockBin = {
            authorId: 'user123',
        }
        const mockDeletedBin = { id: 1, binId: 'abc123defg' }

        mockPrisma.bin.findUnique.mockResolvedValue(mockBin)
        mockPrisma.bin.delete.mockResolvedValue(mockDeletedBin)

        const result = await BinService.delete('abc123defg', 'user123')

        expect(mockPrisma.bin.findUnique).toHaveBeenCalledWith({
            where: { binId: 'abc123defg' },
            select: { authorId: true },
        })
        expect(mockPrisma.bin.delete).toHaveBeenCalledWith({
            where: { binId: 'abc123defg' },
        })
        expect(result).toEqual(mockDeletedBin)
    })

    it('should throw error for unauthorized user', async () => {
        const mockBin = {
            authorId: 'user123',
        }

        mockPrisma.bin.findUnique.mockResolvedValue(mockBin)

        await expect(
            BinService.delete('abc123defg', 'differentuser')
        ).rejects.toThrow('Not authorized or bin not found')

        expect(mockPrisma.bin.delete).not.toHaveBeenCalled()
    })

    it('should throw error if bin not found', async () => {
        mockPrisma.bin.findUnique.mockResolvedValue(null)

        await expect(
            BinService.delete('nonexistent', 'user123')
        ).rejects.toThrow('Not authorized or bin not found')

        expect(mockPrisma.bin.delete).not.toHaveBeenCalled()
    })

    it('should not call delete if authorization check fails', async () => {
        const mockBin = {
            authorId: 'originalauthor',
        }

        mockPrisma.bin.findUnique.mockResolvedValue(mockBin)

        try {
            await BinService.delete('abc123defg', 'malicioususer')
        } catch (error) {
            // Expected to throw
        }

        expect(mockPrisma.bin.delete).not.toHaveBeenCalled()
    })
})
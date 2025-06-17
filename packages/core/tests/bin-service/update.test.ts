import { describe, it, expect, beforeEach, vi } from 'vitest'

// Setup mocks before imports
vi.mock('@codebinx/db', () => ({
    default: {
        bin: {
            findUnique: vi.fn(),
            update: vi.fn(),
        },
    }
}))

vi.mock('bcryptjs', () => ({
    hash: vi.fn(),
    compare: vi.fn(),
}))

import { BinService } from '@codebinx/core'
import prisma from '@codebinx/db'
import * as bcrypt from 'bcryptjs'

// Get the mocked instances
const mockPrisma = prisma as any
const mockBcrypt = bcrypt as any

describe('BinService.update', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should update bin when authorized', async () => {
        const binId = 'bin_123'
        const authorClerkId = 'user_123'
        const updateData = {
            title: 'Updated Title',
            content: 'Updated content',
            language: 'typescript'
        }

        const existingBin = {
            id: 'bin_id_123',
            binId,
            authorId: authorClerkId,
            title: 'Old Title',
            content: 'Old content'
        }

        const updatedBin = {
            ...existingBin,
            ...updateData,
            password: null,
            updatedAt: new Date()
        }

        mockPrisma.bin.findUnique.mockResolvedValue(existingBin)
        mockPrisma.bin.update.mockResolvedValue(updatedBin)

        const result = await BinService.update(binId, authorClerkId, updateData)

        expect(mockPrisma.bin.findUnique).toHaveBeenCalledWith({
            where: { binId }
        })

        expect(mockPrisma.bin.update).toHaveBeenCalledWith({
            where: { binId },
            data: {
                ...updateData,
                password: null,
            }
        })

        expect(result).toEqual(updatedBin)
    })

    it('should hash password when updating with new password', async () => {
        const binId = 'bin_123'
        const authorClerkId = 'user_123'
        const newPassword = 'newpassword123'
        const hashedPassword = 'hashed_new_password'
        
        const updateData = {
            title: 'Updated Title',
            password: newPassword
        }

        const existingBin = {
            id: 'bin_id_123',
            binId,
            authorId: authorClerkId,
            title: 'Old Title'
        }

        const updatedBin = {
            ...existingBin,
            title: updateData.title,
            password: hashedPassword,
            updatedAt: new Date()
        }

        mockPrisma.bin.findUnique.mockResolvedValue(existingBin)
        mockBcrypt.hash.mockResolvedValue(hashedPassword)
        mockPrisma.bin.update.mockResolvedValue(updatedBin)

        const result = await BinService.update(binId, authorClerkId, updateData)

        expect(mockBcrypt.hash).toHaveBeenCalledWith(newPassword, 10)
        expect(mockPrisma.bin.update).toHaveBeenCalledWith({
            where: { binId },
            data: {
                title: updateData.title,
                password: hashedPassword,
            }
        })

        expect(result).toEqual(updatedBin)
    })

    it('should throw error for unauthorized update', async () => {
        const binId = 'bin_123'
        const authorClerkId = 'user_123'
        const wrongUserId = 'user_456'
        
        const updateData = { title: 'Updated Title' }

        const existingBin = {
            id: 'bin_id_123',
            binId,
            authorId: authorClerkId, // Different from wrongUserId
            title: 'Old Title'
        }

        mockPrisma.bin.findUnique.mockResolvedValue(existingBin)

        await expect(
            BinService.update(binId, wrongUserId, updateData)
        ).rejects.toThrow('Not authorized or bin not found')

        expect(mockPrisma.bin.update).not.toHaveBeenCalled()
    })

    it('should throw error for non-existent bin', async () => {
        const binId = 'non_existent_bin'
        const authorClerkId = 'user_123'
        const updateData = { title: 'Updated Title' }

        mockPrisma.bin.findUnique.mockResolvedValue(null)

        await expect(
            BinService.update(binId, authorClerkId, updateData)
        ).rejects.toThrow('Not authorized or bin not found')

        expect(mockPrisma.bin.update).not.toHaveBeenCalled()
    })

    it('should throw error for password shorter than 6 characters', async () => {
        const binId = 'bin_123'
        const authorClerkId = 'user_123'
        const shortPassword = '12345' // Less than 6 characters
        
        const updateData = {
            title: 'Updated Title',
            password: shortPassword
        }

        const existingBin = {
            id: 'bin_id_123',
            binId,
            authorId: authorClerkId,
            title: 'Old Title'
        }

        mockPrisma.bin.findUnique.mockResolvedValue(existingBin)

        await expect(
            BinService.update(binId, authorClerkId, updateData)
        ).rejects.toThrow('Password must be at least 6 characters long')

        expect(mockPrisma.bin.update).not.toHaveBeenCalled()
    })
})

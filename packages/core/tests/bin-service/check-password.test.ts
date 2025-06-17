// tests/bin-service/check-password.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { mockPrisma, mockBcrypt, resetAllMocks } from '../setup/bin-service'
import { BinService } from '@codebinx/core'

describe('BinService.checkPassword', () => {
    beforeEach(() => {
        resetAllMocks()
    })

    it('should return true for correct password', async () => {
        const mockBin = { password: 'hashedpassword123' }
        mockPrisma.bin.findUnique.mockResolvedValue(mockBin)
        mockBcrypt.compare.mockResolvedValue(true)

        const result = await BinService.checkPassword('abc123defg', 'correctpassword')

        expect(mockPrisma.bin.findUnique).toHaveBeenCalledWith({
            where: { binId: 'abc123defg' },
            select: { password: true },
        })
        expect(mockBcrypt.compare).toHaveBeenCalledWith('correctpassword', 'hashedpassword123')
        expect(result).toBe(true)
    })

    it('should return false for incorrect password', async () => {
        const mockBin = { password: 'hashedpassword123' }
        mockPrisma.bin.findUnique.mockResolvedValue(mockBin)
        mockBcrypt.compare.mockResolvedValue(false)

        const result = await BinService.checkPassword('abc123defg', 'wrongpassword')

        expect(mockBcrypt.compare).toHaveBeenCalledWith('wrongpassword', 'hashedpassword123')
        expect(result).toBe(false)
    })

    it('should return false if bin not found', async () => {
        mockPrisma.bin.findUnique.mockResolvedValue(null)

        const result = await BinService.checkPassword('nonexistent', 'anypassword')

        expect(result).toBe(false)
        expect(mockBcrypt.compare).not.toHaveBeenCalled()
    })

    it('should return false if bin has no password', async () => {
        const mockBin = { password: null }
        mockPrisma.bin.findUnique.mockResolvedValue(mockBin)

        const result = await BinService.checkPassword('abc123defg', 'anypassword')

        expect(result).toBe(false)
        expect(mockBcrypt.compare).not.toHaveBeenCalled()
    })

    it('should return false if bin has empty string password', async () => {
        const mockBin = { password: '' }
        mockPrisma.bin.findUnique.mockResolvedValue(mockBin)

        const result = await BinService.checkPassword('abc123defg', 'anypassword')

        expect(result).toBe(false)
        expect(mockBcrypt.compare).not.toHaveBeenCalled()
    })
})
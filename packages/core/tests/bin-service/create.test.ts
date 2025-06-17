import { BinService } from '@codebinx/core'
import { mockBcrypt, mockNanoid, mockPrisma, resetAllMocks } from '../setup/bin-service'
import { describe, it, expect, beforeEach } from 'vitest'

describe('BinService.create', () => {
    beforeEach(() => {
        resetAllMocks()
    })

    it('should create a bin without password', async () => {
        const mockBinId = 'abc123defg'
        const mockCreatedBin = {
            id: 1,
            binId: mockBinId,
            title: 'Test Bin',
            content: 'console.log("hello")',
            language: 'javascript',
            authorId: 'user123',
            password: null,
        }

        mockNanoid.mockReturnValue(mockBinId)
        mockPrisma.bin.create.mockResolvedValue(mockCreatedBin)

        const data = {
            title: 'Test Bin',
            content: 'console.log("hello")',
            language: 'javascript',
            authorId: 'user123',
        }

        const result = await BinService.create(data)

        expect(mockNanoid).toHaveBeenCalledWith(10)
        expect(mockPrisma.bin.create).toHaveBeenCalledWith({
            data: {
                ...data,
                password: null,
                binId: mockBinId,
            },
        })
        expect(result).toEqual(mockCreatedBin)
    })

    it('should create a bin with hashed password', async () => {
        const mockBinId = 'abc123defg'
        const mockHashedPassword = 'hashedpassword123'
        const mockCreatedBin = {
            id: 1,
            binId: mockBinId,
            title: 'Test Bin',
            content: 'console.log("hello")',
            language: 'javascript',
            authorId: 'user123',
            password: mockHashedPassword,
        }

        mockNanoid.mockReturnValue(mockBinId)
        mockBcrypt.hash.mockResolvedValue(mockHashedPassword)
        mockPrisma.bin.create.mockResolvedValue(mockCreatedBin)

        const data = {
            title: 'Test Bin',
            content: 'console.log("hello")',
            language: 'javascript',
            authorId: 'user123',
            password: 'plainpassword',
        }

        const result = await BinService.create(data)

        expect(mockBcrypt.hash).toHaveBeenCalledWith('plainpassword', 10)
        expect(mockPrisma.bin.create).toHaveBeenCalledWith({
            data: {
                title: 'Test Bin',
                content: 'console.log("hello")',
                language: 'javascript',
                authorId: 'user123',
                password: mockHashedPassword,
                binId: mockBinId,
            },
        })
        expect(result).toEqual(mockCreatedBin)
    })
})
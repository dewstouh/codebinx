import { describe, it, expect, beforeEach, vi } from 'vitest'

// Setup mocks before imports
vi.mock('@codebinx/db', () => ({
    default: {
        bin: {
            create: vi.fn(),
            findUnique: vi.fn(),
            findMany: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
        },
        comment: {
            findMany: vi.fn(),
        },
    }
}))

vi.mock('bcryptjs', () => ({
    hash: vi.fn(),
    compare: vi.fn(),
}))

vi.mock('nanoid', () => ({
    nanoid: vi.fn()
}))

import { BinService } from '@codebinx/core'
import prisma from '@codebinx/db'
import * as bcrypt from 'bcryptjs'
import { nanoid } from 'nanoid'

// Get the mocked instances
const mockPrisma = prisma as any
const mockBcrypt = bcrypt as any
const mockNanoid = nanoid as any

describe('BinService.create', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should create a bin without password', async () => {
        const mockBinId = 'abc123defg'
        const mockCreatedBin = {
            id: 'cuid_example_1',
            binId: mockBinId,
            title: 'Test Bin',
            description: null,
            content: 'console.log("hello")',
            language: 'javascript',
            views: 0,
            expiresAt: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            isPrivate: false,
            password: null,
            authorId: null,
        }

        mockNanoid.mockReturnValue(mockBinId)
        mockPrisma.bin.create.mockResolvedValue(mockCreatedBin)

        const data = {
            title: 'Test Bin',
            content: 'console.log("hello")',
            language: 'javascript',
            authorId: null,
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
            id: 'cuid_example_2',
            binId: mockBinId,
            title: 'Test Bin',
            description: null,
            content: 'console.log("hello")',
            language: 'javascript',
            views: 0,
            expiresAt: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            isPrivate: false,
            password: mockHashedPassword,
            authorId: null,
        }

        mockNanoid.mockReturnValue(mockBinId)
        mockBcrypt.hash.mockResolvedValue(mockHashedPassword)
        mockPrisma.bin.create.mockResolvedValue(mockCreatedBin)

        const data = {
            title: 'Test Bin',
            content: 'console.log("hello")',
            language: 'javascript',
            authorId: null,
            password: 'plainpassword',
        }

        const result = await BinService.create(data)

        expect(mockBcrypt.hash).toHaveBeenCalledWith('plainpassword', 10)
        expect(mockPrisma.bin.create).toHaveBeenCalledWith({
            data: {
                title: 'Test Bin',
                content: 'console.log("hello")',
                language: 'javascript',
                authorId: null,
                password: mockHashedPassword,
                binId: mockBinId,
            },
        })
        expect(result).toEqual(mockCreatedBin)
    })
})
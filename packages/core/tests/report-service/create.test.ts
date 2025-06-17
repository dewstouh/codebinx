import { describe, it, expect, beforeEach, vi } from 'vitest'

// Setup mocks before imports
vi.mock('@codebinx/db', () => ({
    default: {
        report: {
            create: vi.fn(),
        },
    }
}))

import { ReportService } from '@codebinx/core'
import prisma from '@codebinx/db'

// Get the mocked instance
const mockPrisma = prisma as any

describe('ReportService.create', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should create a bin report', async () => {
        const mockReport = {
            id: 'report_1',
            reason: 'Inappropriate content',
            createdAt: new Date(),
            updatedAt: new Date(),
            authorId: 'user_123',
            targetType: 'bin' as const,
            targetId: 'bin_123'
        }

        mockPrisma.report.create.mockResolvedValue(mockReport)

        const data = {
            reason: 'Inappropriate content',
            authorId: 'user_123',
            targetType: 'bin' as const,
            targetId: 'bin_123'
        }

        const result = await ReportService.create(data)

        expect(mockPrisma.report.create).toHaveBeenCalledWith({ data })
        expect(result).toEqual(mockReport)
    })

    it('should create a user report', async () => {
        const mockReport = {
            id: 'report_2',
            reason: 'Spam behavior',
            createdAt: new Date(),
            updatedAt: new Date(),
            authorId: 'user_123',
            targetType: 'user' as const,
            targetId: 'user_456'
        }

        mockPrisma.report.create.mockResolvedValue(mockReport)

        const data = {
            reason: 'Spam behavior',
            authorId: 'user_123',
            targetType: 'user' as const,
            targetId: 'user_456'
        }

        const result = await ReportService.create(data)

        expect(mockPrisma.report.create).toHaveBeenCalledWith({ data })
        expect(result).toEqual(mockReport)
    })

    it('should create a comment report', async () => {
        const mockReport = {
            id: 'report_3',
            reason: 'Offensive language',
            createdAt: new Date(),
            updatedAt: new Date(),
            authorId: 'user_123',
            targetType: 'comment' as const,
            targetId: 'comment_789'
        }

        mockPrisma.report.create.mockResolvedValue(mockReport)

        const data = {
            reason: 'Offensive language',
            authorId: 'user_123',
            targetType: 'comment' as const,
            targetId: 'comment_789'
        }

        const result = await ReportService.create(data)

        expect(mockPrisma.report.create).toHaveBeenCalledWith({ data })
        expect(result).toEqual(mockReport)
    })
})

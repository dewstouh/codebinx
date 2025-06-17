import { vi } from 'vitest'

export const mockPrisma = {
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

export const mockBcrypt = {
    hash: vi.fn(),
    compare: vi.fn(),
}

export const mockNanoid = vi.fn()

// Setup mocks
vi.mock('@codebinx/db', () => ({ default: mockPrisma }))
vi.mock('bcryptjs', () => mockBcrypt)
vi.mock('nanoid', () => ({ nanoid: mockNanoid }))

export const resetAllMocks = () => {
    vi.clearAllMocks()
}
import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: [
            'packages/**/*.test.ts',
            'tests/**/*.test.ts'
        ],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html']
        }
    },
    resolve: {
        alias: {
            '@codebinx/db': require('path').resolve(__dirname, 'packages/db/src/index.ts'),
            '@codebinx/core': require('path').resolve(__dirname, 'packages/core/src/index.ts'),
        },
      },
})

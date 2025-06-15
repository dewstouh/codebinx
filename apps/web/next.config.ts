import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    transpilePackages: [
        '@codebinx/core',
        '@codebinx/db',
        '@codebinx/utils'
    ]
}

export default nextConfig

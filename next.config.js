/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'aiimagegenerator01.blob.core.windows.net',
            },
        ]
    }
}

module.exports = nextConfig

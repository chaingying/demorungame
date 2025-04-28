/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['www.marathonsworld.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.marathonsworld.com',
        pathname: '/ExploreKaohsiung/images/**',
      },
    ],
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  basePath: '/demorungame',
  assetPrefix: '/demorungame/',
  output: 'export',
}

export default nextConfig

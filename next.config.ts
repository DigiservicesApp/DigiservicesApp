import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(
      process.cwd(),
      ['app', 'components', 'lib'].join('/')
    );
    return config;
  },
  // Note: appDir is enabled by default in Next.js 13
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Allow TypeScript to build even if errors exist (keep current behavior)
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;

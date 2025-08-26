import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Keep static export as requested
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    // Use process.cwd() to compute repo root in a portable way
    config.resolve.alias['@'] = path.resolve(
      process.cwd(),
      ['app', 'components', 'lib'].join('/')
    );
    return config;
  },
  // Disable ESLint during builds so production exports succeed
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Allow TypeScript to build even if errors exist (keep current behavior)
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;

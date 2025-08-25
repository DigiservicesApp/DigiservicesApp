const path = require('path');
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  exportTrailingSlash: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(
      __dirname,
      ['app', 'components', 'lib'].join('/')
    );
    return config;
  },
};

const path = require('path');
module.exports = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(
      __dirname,
      ['app', 'components', 'lib'].join('/')
    );
    return config;
  },
};

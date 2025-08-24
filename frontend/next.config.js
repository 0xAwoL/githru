/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/githru' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/githru' : '',
  images: {
    unoptimized: true
  },
  webpack: (config) => {
    // Handle JSON imports
    config.module.rules.push({
      test: /\.json$/,
      type: 'json'
    });
    return config;
  }
};

module.exports = nextConfig;

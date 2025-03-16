/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: isProd ? '/chinese-flashcards/' : '',
  basePath: isProd ? '/chinese-flashcards' : '',
  // output: 'export'
};

module.exports = nextConfig
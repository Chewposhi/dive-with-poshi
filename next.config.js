/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  target: 'serverless', // Required for Netlify to handle SSR and API routes
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

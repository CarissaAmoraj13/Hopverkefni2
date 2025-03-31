/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000",
  },
  images: {
    domains: ["your-backend-domain.com"], // Update with your actual backend domain if needed
  },
};

module.exports = nextConfig;

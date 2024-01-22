/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        { hostname: "http://localhost:4000/" },
        { hostname: "localhost" },
        { hostname: "lh3.googleusercontent.com" },
        { hostname: "lwgbucket.s3.ap-southeast-2.amazonaws.com" },
        { hostname: "images.unsplash.com" }
      ],
    },
    reactStrictMode: true,
    env: {
      BASE_URL: process.env.BASE_URL,
    }
  };
  
  module.exports = nextConfig;
   
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com', // Replace with exact dynamic asset deployment target/Google context domains url storage targets
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Required for Google Auth Direct Avatar rendering layout profiles
      }
    ],
  },
};

export default nextConfig;
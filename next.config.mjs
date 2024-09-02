/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn.dummyjson.com',
            port: '', // Optional, only if you need to specify a port
            pathname: '/products/images/**', // Path to match, adjust as needed
          },
        ],
      },
};

export default nextConfig;

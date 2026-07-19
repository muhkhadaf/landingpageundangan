import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow images from private IPs (localhost/XAMPP) in development
    dangerouslyAllowSVG: true,
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avbvqitaiajtmmtevtfi.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        // XAMPP localhost (default port 80)
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/**',
      },
      {
        // ngrok tunnels (HTTP)
        protocol: 'http',
        hostname: '**.ngrok-free.app',
        port: '',
        pathname: '/**',
      },
      {
        // ngrok tunnels (HTTPS)
        protocol: 'https',
        hostname: '**.ngrok-free.app',
        port: '',
        pathname: '/**',
      },
      {
        // ngrok legacy domains
        protocol: 'https',
        hostname: '**.ngrok.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

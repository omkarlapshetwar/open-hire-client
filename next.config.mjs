/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com', 'ui-avatars.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://a958-2401-4900-1c97-3f32-4146-f185-7352-7481.ngrok-free.app/api/:path*',
      },
    ];
  },
};

export default nextConfig;
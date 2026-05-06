import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  transpilePackages: ['lucide-react'],
  reactStrictMode: true,
  distDir: '.next',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/scoutinglommel/**',
      },
      {
        protocol: 'https',
        hostname: 'admin.scoutinglommel.be',
        pathname: '/uploads/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  webpack: (config) => {
    // GQL loader
    config.module.rules.push({
      test: /\.g(raph)?ql$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    // SVGR loader
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  async redirects() {
    return [{ source: '/home', destination: '/', permanent: true }];
  },
};

export default withNextIntl(nextConfig);

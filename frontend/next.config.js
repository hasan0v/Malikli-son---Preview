/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing Next.js config (if any)
  experimental: {
    // If you are using Turbopack, ensure CSS processing is compatible
    // For Tailwind CSS v4, direct PostCSS plugin usage might differ
    // from v3. Consider if specific Turbopack flags are needed
    // or if relying on the default Next.js CSS processing is intended.
  },
  // Configure allowed image domains for next/image
  images: {
    domains: ['media.malikli1992.com'],
    // Alternatively, you can use remotePatterns for more control:
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'media.malikli1992.com',
    //     pathname: '/media/**',
    //   },
    // ],
  },
  // Explicitly tell Next.js to use PostCSS
  // This can sometimes help with Turbopack and Tailwind CSS v4
  webpack: (config, { dev, isServer }) => {
    config.module.rules.forEach((rule) => {
      if (rule.oneOf) {
        rule.oneOf.forEach((oneOfRule) => {
          if (
            oneOfRule.use &&
            oneOfRule.use.loader &&
            oneOfRule.use.loader.includes('postcss-loader')
          ) {
            // Ensure our postcss.config.js is being used
            oneOfRule.use.options = {
              ...oneOfRule.use.options,
              postcssOptions: {
                config: './postcss.config.js',
              },
            };
          }
        });
      }
    });
    return config;
  },
};

module.exports = nextConfig;

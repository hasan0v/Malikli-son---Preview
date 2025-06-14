import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  /* config options here */
};

export default nextConfig;

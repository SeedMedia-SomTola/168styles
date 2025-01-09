import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.unsplash.com",'www.appsheet.com','i.pinimg.com'], // Add the domain here
  },
};

export default withNextIntl(nextConfig);

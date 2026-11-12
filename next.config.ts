import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // the old /services overview page was removed – send old links to the Services section on the home page
      { source: "/services", destination: "/#service", permanent: false },
    ];
  },
};

export default nextConfig;

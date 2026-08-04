import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
  },

  async redirects() {
    return [
      {
        source: "/proyecto",
        destination: "/es/proyecto",
        permanent: true,
      },
      {
        source: "/sobre-mi",
        destination: "/es/sobre-mi",
        permanent: true,
      },
      {
        source: "/item/:id",
        destination: "/es/item/:id",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

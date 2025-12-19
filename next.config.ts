import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.tina.io",
        pathname: "/**",
      },
    ],
    // Formatos modernos para mejor compresión
    formats: ["image/avif", "image/webp"],
    // Tamaños optimizados para dispositivos comunes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache de imágenes por 1 año
    minimumCacheTTL: 31536000,
  },

  // Headers de cache para assets estáticos
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Compresión habilitada
  compress: true,

  // Optimizaciones experimentales
  experimental: {
    optimizePackageImports: ["lucide-react", "embla-carousel-react"],
  },
};

export default nextConfig;

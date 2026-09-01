import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The site ships photography at q82 and headshots at q90.
    qualities: [75, 82, 90],
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            /*
             * The microphone must be allowed for the chat assistant's voice
             * input. `self` keeps it to our own origin: embedded third-party
             * frames (the Google map) still cannot reach it.
             */
            key: "Permissions-Policy",
            value: "camera=(), microphone=(self), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

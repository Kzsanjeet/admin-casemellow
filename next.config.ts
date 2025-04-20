// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   domains: ['res.cloudinary.com']
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Accept any hostname
        pathname: "/**", // Allow images from any path
      },
    ],
  },
  // Other configurations can go here
};

export default nextConfig;
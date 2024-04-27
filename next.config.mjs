/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ucarecdn.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

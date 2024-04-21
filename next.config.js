/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "lh3.googleusercontent.com" },
      {
        hostname: "daisyui.com",
      },
      { hostname: "res.cloudinary.com" },
    ],
  },
 
};

module.exports = nextConfig;

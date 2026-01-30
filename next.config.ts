/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["staging.lwkp.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "staging.lwkp.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["hostedsitedemo.com"],
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "hostedsitedemo.com",
//         pathname: "/lwkp/wp-content/uploads/**",
//       },
//     ],
//   },
// };

// module.exports = nextConfig;

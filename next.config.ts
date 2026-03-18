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

  async redirects() {
    return [
      {
        // match any 2-letter prefix (language codes)
        source: "/:lang([a-zA-Z]{2})/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/:lang([a-zA-Z]{2})",
        destination: "/",
        permanent: true,
      },
    ];
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

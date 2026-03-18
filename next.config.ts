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
      // {
      //   source: "/aa",
      //   destination: "/",
      //   permanent: true,
      // },
      // {
      //   source: "/en/:path*",
      //   destination: "/",
      //   permanent: true,
      // },
      // {
      //   source: "/zh",
      //   destination: "/",
      //   permanent: true,
      // },
      //       {
      //   source: "/dd",
      //   destination: "/",
      //   permanent: true,
      // },
      // {
      //   source: "/zh/:path*",
      //   destination: "/",
      //   permanent: true,
      // },
      {
        source: "/en",
        destination: "/404",
        permanent: false, // 307 (temporary)
      },
      {
        source: "/zh",
        destination: "/404",
        permanent: false,
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

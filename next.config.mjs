/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
// module.exports = {
//     images: {
//       remotePatterns: [
//         {
//           protocol: 'https',
//           hostname: 'cdn.discordapp.com',
//           port: '',
//         //   pathname: '/account123/**',
//         },
//       ],
//     },
//   }
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
        //   pathname: '/account123/**',
      },
      {
        hostname: "files.edgestore.dev",
      },
    ],
  },
};

export default config;

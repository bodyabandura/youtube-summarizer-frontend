// const siteUrl = "http://localhost:3000";

// const exclude = [
//   "/dashboard*",
//   "/settings*",
//   "/onboarding*",
//   "/blog/tags*",
//   "/auth*",
// ];

// // Save crawling budget by not fetching SSG meta files
// const NEXT_SSG_FILES = [
//   "/*.json$",
//   "/*_buildManifest.js$",
//   "/*_middlewareManifest.js$",
//   "/*_ssgManifest.js$",
//   "/*.js$",
// ];

// /** @type {import('next-sitemap').IConfig} */
// const config = {
//   siteUrl: "https://app.slack.com/",
//   generateRobotsTxt: true,
//   exclude,
//   robotsTxtOptions: {
//     policies: [
//       {
//         userAgent: "*",
//         disallow: NEXT_SSG_FILES,
//       },
//     ],
//   },
// };

// module.exports = {
//   config,
// };

module.exports = {
  siteUrl: process.env.SITE_URL || "http://localhost:3000",
  generateRobotsTxt: true, // (optional)
  // ...other options
};

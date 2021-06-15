const optimizedImages = require("next-optimized-images");

module.exports = optimizedImages({
  async rewrites() {
    return [
      {
        source: "/api/:slug*",
        destination: "http://apis.juhe.cn/:slug*",
      },
    ];
  },
});

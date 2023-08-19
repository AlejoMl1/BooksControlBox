const webpack = require("webpack");

module.exports = {
  // ... your other webpack config options

  plugins: [
    // ... other plugins

    new webpack.ProvidePlugin({
      fs: "fs-extra", // Use a browser-compatible fs library
      path: "path-browserify",
      os: "os-browserify/browser",
      crypto: "crypto-browserify",
    }),
  ],
};

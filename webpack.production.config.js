const common = require("./webpack.config.js");
const { merge } = require("webpack-merge");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [{ loader: "postcss-loader" }],
      },
    ],
  },
  plugins: [new CssMinimizerWebpackPlugin()],
  optimization: {
    minimize: true,
    minimizer: [
      "...",
      new CssMinimizerWebpackPlugin(),
    //   new ImageMinimizerPlugin({
    //     minimizer: {
    //       implementation: ImageMinimizerPlugin.imageminMinify,
    //       options: {
    //         plugins: [
    //           ["jpegtran", { progressive: true }],
    //           ["optipng", { optimizationLevel: 5 }],
    //         ],
    //       },
    //     },
    //   }),
    ],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          name: "chunk-vendor",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
        },
        element: {
          name: "chunk-element",
          test: /[\\/]node_modules[\\/]_?element-plus(.*)/,
          priority: 20,
        },
        commons: {
          name: "chunk-commons",
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    },
  },
});

const common = require("./webpack.config.js");
const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  optimization: {
    minimize: false, // 关闭代码压缩
    concatenateModules: false, // 关闭模块合并
    splitChunks: false, // 关闭代码分包
    usedExports: false, // 关闭Tree-shaking
    minimizer: [
      new TerserPlugin({
        parallel: true, // 并行构建
        exclude: /node_modules/,
        // test: /\.(j|t)s$/,
      }),
    ],
  },
  plugins: [],
});

const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HTMLWebapckPlugin = require("html-webpack-plugin");
const SpeedMeasureWebpackPlugin = require("speed-measure-webpack-plugin");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const globalVar = require("./injectGlobalVar.js");
const webpack = require("webpack");

const title = "白浅后台";

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./src/main.ts",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name]_[contenthash:8].js",
    clean: true,
  },
  devServer: {
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: "vue-loader",
        },
      },
      {
        test: /\.(j|t)s$/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.mjs$/,
        resolve: {
          fullySpecified: false,
        },
        include: path.resolve(__dirname, "./node_modules/element-plus"),
        type: "javascript/auto",
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              // additionalData: `
              //   @import "src/style/variables.scss";
              // `,
              sassOptions: {
                includePaths: [__dirname],
              },
            },
          },
          "postcss-loader",
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10 * 1024,
          },
        },
      },
      {
        test: /\.(ttf|woff|woff2)$/,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".js", ".ts", ".vue"],
  },
  plugins: [
    // new SpeedMeasureWebpackPlugin(),
    new VueLoaderPlugin(),
    new HTMLWebapckPlugin({
      template: "./public/index.html",
      title: title,
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(globalVar),
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
    }),

    // element-plus 自动导入
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
};

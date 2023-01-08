const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HTMLWebapckPlugin = require("html-webpack-plugin");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const globalVar = require("./injectGlobalVar.js");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const SpeedMeasureWebpackPlugin = require("speed-measure-webpack-plugin");
const WebpackBundleAnalyzer =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

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
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
          // {
          //   loader: "thread-loader",
          //   options: {
          //     works: 2,
          //   },
          // },
        ],
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
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: [__dirname],
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|png)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10 * 1024,
            },
          },
          // {
          //   loader: "image-webpack-loader",
          //   options: {
          //     mozjpeg: {
          //       quality: 80,
          //     },
          //   },
          // },
        ],
      },
      {
        test: /\.(ttf|woff|woff2)$/,
        type: "asset/resource",
      },
    ],
    noParse: /vue\.runtime\.ems-bundler\.js$/,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".js", ".ts", ".vue"],
  },
  plugins: [
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
    new MiniCssExtractPlugin(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    new SpeedMeasureWebpackPlugin(),
    new WebpackBundleAnalyzer(),
  ],

  // optimization: {
  //   runtimeChunk: "single",
  //   splitChunks: {
  //     chunks: "all",
  //     maxInitialRequests: Infinity,
  //     minSize: 0,
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name(module) {
  //           const packageName = module.context.match(
  //             /[\\/]node_modules[\\/](.*?)([\\/]|$)/
  //           )[1];

  //           return `npm.${packageName.replace("@", "")}`;
  //         },
  //       },
  //     },
  //   },
  // },
};

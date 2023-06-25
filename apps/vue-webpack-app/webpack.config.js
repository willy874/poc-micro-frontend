const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const webpack = require("webpack");

const REMOTE_NAME = "vue_webpack_app";

module.exports = (env = {}) => ({
  mode: "development",
  cache: false,
  devtool: "source-map",
  optimization: {
    minimize: false,
  },
  target: "web",
  entry: path.resolve(__dirname, "./src/main.js"),
  output: {
    publicPath: "auto",
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '..', '..', 'node_modules'),
    ],
    extensions: [".vue", ".jsx", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.m?js(x)?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          plugins: ["@vue/babel-plugin-jsx"]
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: true,
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new ModuleFederationPlugin({
      name: REMOTE_NAME,
      library: {
        type: "var",
        name: REMOTE_NAME,
      },
      filename: "remoteEntry.js",
      exposes: {
        "./app": "./src/bootstrap.js",
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
      publicPath: '/',
    }),
    new VueLoaderPlugin(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 4201,
    host: '0.0.0.0',
    historyApiFallback: {
      disableDotRule: true,
    },
    compress: true,
    hot: true,
    allowedHosts: 'all',
    client: {
      webSocketURL: {
        hostname: '0.0.0.0',
      },
    },
  },
});
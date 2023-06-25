const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

const REMOTE_NAME = "react_webpack_app";

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
    extensions: [".jsx", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.(c|m)?js(x)?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "swc-loader"
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
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 4202,
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
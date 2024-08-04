const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const container = require("@module-federation/enhanced/webpack")
// const { container } = require("webpack");
const REMOTE_NAME = "sub_webpack_app";

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
    clean: false,
    publicPath: 'auto',
    hashFunction: 'xxhash64',
    path:  path.resolve(__dirname, "dist"),
    filename: 'js/entry.[name].[chunkhash:8].js',
    chunkFilename: 'js/chunk.[name].[contenthash:8].js'
  },
  resolve: {
    modules: ['node_modules'],
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
        test: /\.(svg|png|jpe?g|gif|webp|woff2?|eot|[ot]tf)$/i,
        type: 'asset/resource',
      }
    ],
  },
  plugins: [
    new container.ModuleFederationPlugin({
      name: REMOTE_NAME,
      exposes: {
        "./app": "./src/main.js",
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 4111,
    host: '0.0.0.0',
    // historyApiFallback: {
    //   disableDotRule: true,
    // },
    compress: true,
    hot: false,
    allowedHosts: 'all',
    client: {
      webSocketURL: {
        hostname: '0.0.0.0',
      },
    },
  },

  optimization: {
    runtimeChunk: true
  }
});
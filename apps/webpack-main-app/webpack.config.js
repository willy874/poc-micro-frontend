const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const container = require("@module-federation/enhanced/webpack")
// const { container } = require("webpack");
// const REMOTE_NAME = "main_app";

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
    chunkFilename: 'js/chunk.[name].[contenthash:8].js',
    globalObject: 'self'
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
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 4110,
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
    proxy: [
      {
        context: ['/apps/webpack-sub-app'],
        target: 'http://localhost:4111',
        changeOrigin: true,
        pathRewrite: {
          '/apps/webpack-sub-app': ''
        },
        secure: false,
        logLevel: 'debug'
      },
      {
        context: ['/apps/vite-vue-app'],
        target: 'http://localhost:4173',
        changeOrigin: true,
        pathRewrite: {
          '/apps/vite-vue-app': ''
        },
        secure: false,
        logLevel: 'debug'
      }
    ]
  },


  optimization: {
    runtimeChunk: true
  }
});
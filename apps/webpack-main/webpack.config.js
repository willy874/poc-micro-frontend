const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

const REMOTE_NAME = "main_app";
const LOCAL_HOST = '192.168.0.91'

module.exports = (env = {}) => ({
  mode: "development",
  cache: false,
  devtool: "source-map",
  optimization: {
    minimize: false,
  },
  target: "web",
  entry: path.resolve(__dirname, "./src/bootstrap.js"),
  output: {
    publicPath: "auto",
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
      }
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: REMOTE_NAME,
      library: {
        type: "var",
        name: REMOTE_NAME,
      },
      filename: "remoteEntry.js",
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
    proxy: {
      [`/apps/vue_app`]: {
        target: `http://${LOCAL_HOST}:4201/`,
        changeOrigin: true,
        pathRewrite: { [`^/apps/vue_app`]: '' },
      },
      [`/apps/react_app`]: {
        target: `http://${LOCAL_HOST}:4202/`,
        changeOrigin: true,
        pathRewrite: { [`^/apps/react_app`]: '' },
      },
      [`/apps/vue_webpack_app`]: {
        target: `http://${LOCAL_HOST}:4203/`,
        changeOrigin: true,
        pathRewrite: { [`^/apps/vue_webpack_app`]: '' },
      },
      [`/apps/react_webpack_app`]: {
        target: `http://${LOCAL_HOST}:4204/`,
        changeOrigin: true,
        pathRewrite: { [`^/apps/react_webpack_app`]: '' },
      },
      [`/apps/vue_vite_app`]: {
        target: `http://${LOCAL_HOST}:4205`,
        changeOrigin: true,
        pathRewrite: { [`/apps/vue_vite_app`]: '' },
      },
      [`/apps/react_vite_app`]: {
        target: `http://${LOCAL_HOST}:4206`,
        changeOrigin: true,
        pathRewrite: { [`/apps/react_vite_app`]: '' },
      },
    },
  },
});
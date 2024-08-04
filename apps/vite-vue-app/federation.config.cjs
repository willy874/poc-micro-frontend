module.exports = {
  name: 'vite-vue-app',
  exposes: {
    './app': './main.js',
  },
  shared: {
    vue: {
      singleton: true,
      requiredVersion: '^3.0.0',
    },
  },
  sharedMappings: [],
}
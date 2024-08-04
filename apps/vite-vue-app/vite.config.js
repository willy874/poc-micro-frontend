import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import { federation } from '@module-federation/vite';
// import { createEsBuildAdapter } from '@softarc/native-federation-esbuild';
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    vue(),
    vueJsx(),
    // await federation({
    //   options: {
    //     workspaceRoot: __dirname,
    //     outputPath: 'dist',
    //     // tsConfig: 'tsconfig.json',
    //     federationConfig: 'federation.config.cjs',
    //     verbose: false,
    //     dev: command === 'serve',
    //   },
    //   adapter: createEsBuildAdapter({}),
    // }),
    federation({
      name: 'vite_vue_app',
      filename: 'remoteEntry.js',
      exposes: {
        './app': './src/app.js',
      },
      shared: [
        {
          vue: {
            singleton: true,
            requiredVersion: '^3.0.0',
          },
        },
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  esbuild: {
    supported: {
      'top-level-await': true
    },
  }
}));
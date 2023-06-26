import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from "@originjs/vite-plugin-federation";

const REMOTE_NAME = "vue_vite_app";

// https://vitejs.dev/config/
export default defineConfig({
  // http://192.168.0.91:4203/
  preview: {
    host: '0.0.0.0',
    port: 4203,
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  plugins: [
    vue(),
    federation({
      name: REMOTE_NAME,
      filename: "remoteEntry.js",
      exposes: {
        "./app": "./src/bootstrap.js",
      }
    })
  ],
})
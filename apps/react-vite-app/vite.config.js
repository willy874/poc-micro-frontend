import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";

const REMOTE_NAME = "react_vite_app";

// https://vitejs.dev/config/
export default defineConfig({
  preview: {
    host: '0.0.0.0',
    port: 4206,
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  plugins: [
    react(),
    federation({
      name: REMOTE_NAME,
      filename: "remoteEntry.js",
      exposes: {
        "./app": "./src/bootstrap.js",
      }
    })
  ],
})

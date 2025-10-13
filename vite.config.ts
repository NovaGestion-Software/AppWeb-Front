import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import packageInfo from './package.json';
import removeConsole from "vite-plugin-remove-console";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          title: `NovaGestión - V${packageInfo.version} ${
            packageInfo.customEnv === 'development' ? ' - DEV' : ''
          }`,
        },
      },
    }),
    removeConsole()

  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      // cualquier ruta que empiece con /apiphp se reenvía al host real
      "/apiphp": {
        target: "https://apiphp.novagestion.com.ar",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/apiphp/, ""),
      },
    },}
});

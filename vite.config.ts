import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Para registrar el SW automáticamente
      manifest: {
        short_name: 'NovaMedical',
        name: 'NovaMedical',
        description: 'Gestión y Administración de Centros Médicos',
        start_url: '/',
        lang: 'es',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#081A51',
        icons: [
          {
            src: '/img/logos/novaLogo-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/img/logos/novaLogo-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        screenshots: [
          {
            src: '/img/screenshots/login-screen.png',
            sizes: '1920x993',
            type: 'image/png',
            form_factor: 'narrow',
          },
          {
            src: '/img/screenshots/home-screen.png',
            sizes: '1920x991',
            type: 'image/png',
            form_factor: 'wide',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /.*\.(?:js|css|html|png|jpg|jpeg|svg|gif|ico|woff2)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'assets-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 1 semana
              },
            },
          },
          {
            urlPattern: /\/$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'home-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 1 mes
              },
            },
          },
          {
            urlPattern: /\/logos\/novaLogo\.png/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 5,
              },
            },
          },
          {
            urlPattern: /\/icons\/excel\.png/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 5,
              },
            },
          },
          {
            urlPattern: /\/icons\/settings\.png/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 5,
              },
            },
          },
          {
            urlPattern: /\/icons\/sync\.png/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 5,
              },
            },
          },
          {
            urlPattern: /\/icons\/printer\.png/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 5,
              },
            },
          },
        ],
      },
    }),
  ],
});

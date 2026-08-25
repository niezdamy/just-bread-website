import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import vueI18n from '@intlify/unplugin-vue-i18n/vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/just-bread-website/' : '/',
  plugins: [
    vue(),
    vueI18n({
      include: path.resolve(import.meta.dirname, './src/locales/**'),
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
});

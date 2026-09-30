import { defineConfig } from 'vitest/config'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueI18n from '@intlify/unplugin-vue-i18n/vite'

export default defineConfig({
  plugins: [
    vue(),
    vueI18n({
      include: path.resolve(import.meta.dirname, './src/locales/**'),
    }),
  ],
  test: {
    environment: 'jsdom',
  },
})
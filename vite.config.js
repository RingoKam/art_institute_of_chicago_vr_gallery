import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/art_institute_of_chicago_vr_gallery/',
  build: {
    outDir: "docs"
  },
  server: {
    https: false
  },
  plugins: [vue()]
})

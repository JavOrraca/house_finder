import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://house-finder.netlify.app',
  output: 'static',
  build: {
    assets: '_assets'
  },
  vite: {
    build: {
      cssCodeSplit: false
    }
  }
});

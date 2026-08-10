import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    prerender: {
      crawl: true,
      handleHttpError: 'warn',
      handleUnseenRoutes: 'ignore'
    }
  }
};

export default config;
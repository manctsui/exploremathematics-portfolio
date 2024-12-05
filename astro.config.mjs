import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  prefetch: false,

  build: {
      inlineStylesheets: 'never',
  },
  site: 'https://exploremathematics.org',
  integrations: [sitemap()],
});
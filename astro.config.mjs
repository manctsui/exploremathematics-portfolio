import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

import playformCompress from '@playform/compress';

export default defineConfig({
  prefetch: false,

  build: {
      // inlineStylesheets: 'never',
  },
  site: 'https://exploremathematics.org',
  integrations: [sitemap(), playformCompress()],
});
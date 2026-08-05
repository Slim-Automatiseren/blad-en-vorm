// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Statische site voor Netlify. Het contactformulier loopt via Netlify Forms
// (detectie op de statische HTML), dus er is geen adapter of endpoint nodig.
export default defineConfig({
  site: 'https://www.bladenvorm.nl',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      // De bedanktpagina is bewust noindex en hoort niet in de sitemap
      filter: (pagina) => !pagina.includes('/bedankt'),
      i18n: { defaultLocale: 'nl', locales: { nl: 'nl', en: 'en' } },
    }),
  ],
});

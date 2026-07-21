// @ts-check
import { defineConfig } from 'astro/config';

// Statische site voor Netlify. Het contactformulier loopt via Netlify Forms
// (detectie op de statische HTML), dus er is geen adapter of endpoint nodig.
export default defineConfig({
  site: 'https://bladvorm.nl',
  output: 'static',
  trailingSlash: 'ignore',
});

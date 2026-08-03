import type { APIRoute } from 'astro';

/* Zelfde schakelaar als de noindex-meta in Basis.astro: tot livegang is de
   hele site geblokkeerd, daarna alles open behalve de bedanktpagina. */
const indexeerbaar = import.meta.env.PUBLIC_INDEXEERBAAR === 'ja';

const inhoud = indexeerbaar
  ? ['User-agent: *', 'Allow: /', 'Disallow: /bedankt/', '', `Sitemap: ${new URL('sitemap-index.xml', import.meta.env.SITE)}`, ''].join('\n')
  : ['User-agent: *', 'Disallow: /', ''].join('\n');

export const GET: APIRoute = () =>
  new Response(inhoud, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });

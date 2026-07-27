/* Inline SVG-iconen. Lijnwerk in currentColor, kleur bepaalt de omliggende CSS.
   De pijler-iconen zijn per naam kiesbaar in Sanity (veld "icoon"). */

const lijn = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';

export const pijlerIconen: Record<string, string> = {
  // Blad met nerf: het ontwerp en de beplanting
  advies: `<svg ${lijn}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z"/><path d="M2 21c0-3 1.9-5.4 5.1-6C9.5 14.5 12 13 13 12"/></svg>`,
  // Bestelbus met duidelijk zichtbare wielen (r 2,6 op een viewbox van 24)
  levering: `<svg ${lijn}><path d="M1 16V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v10"/><path d="M14 8h3.6a1 1 0 0 1 .8.4l3.4 4.5a1 1 0 0 1 .2.6V16"/><path d="M2 16h4.6"/><path d="M11.4 16h5.2"/><path d="M20.4 16H22"/><circle cx="9" cy="16" r="2.6"/><circle cx="18.4" cy="16" r="2.6"/></svg>`,
  // Waterdruppel: verzorging (symmetrische druppel)
  onderhoud: `<svg ${lijn}><path d="M12 2.5C10.5 5.5 6 10 6 14.5a6 6 0 0 0 12 0C18 10 13.5 5.5 12 2.5Z"/></svg>`,
  // Twee pijlen rond: vervanging
  vervanging: `<svg ${lijn}><path d="M3 12a9 9 0 0 1 9-9 9.7 9.7 0 0 1 6.7 2.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.7 9.7 0 0 1-6.7-2.7L3 16"/><path d="M8 16H3v5"/></svg>`,
  // Persoon: één vast aanspreekpunt
  aanspreekpunt: `<svg ${lijn}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  // Kalender met vinkje: vast bedrag per maand
  maandbedrag: `<svg ${lijn}><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/></svg>`,
};

export const vinkje =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>';

/* Plantladder op de pakketkaarten: één tot vier halmen, oplopend met het pakket */
const halm1 = '<path d="M30 56 C30 40 30 30 30 18"/><path d="M30 38 C22 36 17 30 16 22 C25 22 30 28 30 38"/><path d="M30 30 C38 28 43 22 44 14 C35 14 30 20 30 30"/>';
const halm2 = halm1 + '<path d="M44 56 C44 46 44 40 44 32"/><path d="M44 44 C39 42 36 38 35 32 C41 32 44 36 44 44"/>';
const halm3 = halm2 + '<path d="M16 56 C16 48 16 44 16 36"/><path d="M16 48 C11 46 8 42 7 36 C13 36 16 40 16 48"/><path d="M16 44 C21 42 24 38 25 32 C19 32 16 36 16 44"/>';
const halm4 = halm3 + '<path d="M53 56 C53 50 53 46 53 41"/><path d="M53 49 C49.5 47.5 47.5 44.5 47 41 C51 41 53 44 53 49"/>';

function ladder(maat: number, paden: string): string {
  return `<svg width="${maat}" height="${maat}" viewBox="0 0 60 60" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" aria-hidden="true">${paden}</svg>`;
}

export const plantladders: Record<string, string> = {
  S: ladder(26, halm1),
  M: ladder(32, halm2),
  L: ladder(38, halm3),
  XL: ladder(44, halm4),
};

export const whatsappIcoon =
  '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8.9-.1.2-.3.2-.5.1-1.2-.6-2-1.1-2.8-2.4-.2-.4.2-.3.6-1 .1-.1 0-.3 0-.4 0-.1-.5-1.3-.7-1.7-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.2 1.6 2.5 3.9 3.5 1.5.6 2 .7 2.7.6.4-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1-.1-.1-.2-.2-.4-.3z"/></svg>';

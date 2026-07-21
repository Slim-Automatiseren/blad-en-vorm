/* Inline SVG-iconen. Lijnwerk in currentColor, kleur bepaalt de omliggende CSS.
   De pijler-iconen zijn per naam kiesbaar in Sanity (veld "icoon"). */

const lijn = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';

export const pijlerIconen: Record<string, string> = {
  advies: `<svg ${lijn}><rect x="3" y="3" width="18" height="18"/><path d="M8 16c0-4.5 3.5-8 8-8-0.5 5-3.5 8-8 8z"/></svg>`,
  levering: `<svg ${lijn}><rect x="3" y="8" width="12" height="10"/><path d="M15 11h4l2 3v4h-6"/><circle cx="7" cy="18" r="0.5"/><circle cx="18" cy="18" r="0.5"/></svg>`,
  onderhoud: `<svg ${lijn}><path d="M12 4c3 4 5 6.5 5 9a5 5 0 1 1-10 0c0-2.5 2-5 5-9z"/></svg>`,
  vervanging: `<svg ${lijn}><path d="M4 12a8 8 0 0 1 13.6-5.6"/><path d="M20 12a8 8 0 0 1-13.6 5.6"/><path d="M18 3v4h-4"/><path d="M6 21v-4h4"/></svg>`,
  aanspreekpunt: `<svg ${lijn}><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></svg>`,
  maandbedrag: `<svg ${lijn}><rect x="4" y="6" width="16" height="15"/><path d="M4 11h16M9 3v5M15 3v5"/><path d="M9 16l2 2 4-4"/></svg>`,
};

export const vinkje =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>';

/* Plantladder op de pakketkaarten: één, twee of drie halmen, oplopend met het pakket */
const halm1 = '<path d="M30 56 C30 40 30 30 30 18"/><path d="M30 38 C22 36 17 30 16 22 C25 22 30 28 30 38"/><path d="M30 30 C38 28 43 22 44 14 C35 14 30 20 30 30"/>';
const halm2 = halm1 + '<path d="M44 56 C44 46 44 40 44 32"/><path d="M44 44 C39 42 36 38 35 32 C41 32 44 36 44 44"/>';
const halm3 = halm2 + '<path d="M16 56 C16 48 16 44 16 36"/><path d="M16 48 C11 46 8 42 7 36 C13 36 16 40 16 48"/><path d="M16 44 C21 42 24 38 25 32 C19 32 16 36 16 44"/>';

function ladder(maat: number, paden: string): string {
  return `<svg width="${maat}" height="${maat}" viewBox="0 0 60 60" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" aria-hidden="true">${paden}</svg>`;
}

export const plantladders: Record<string, string> = {
  S: ladder(26, halm1),
  M: ladder(32, halm2),
  L: ladder(38, halm3),
};

export const whatsappIcoon =
  '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8.9-.1.2-.3.2-.5.1-1.2-.6-2-1.1-2.8-2.4-.2-.4.2-.3.6-1 .1-.1 0-.3 0-.4 0-.1-.5-1.3-.7-1.7-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.2 1.6 2.5 3.9 3.5 1.5.6 2 .7 2.7.6.4-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1-.1-.1-.2-.2-.4-.3z"/></svg>';

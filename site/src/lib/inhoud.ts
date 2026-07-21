/* Inhoudslaag. Bouwtijd-only: de site is statisch, dit draait nooit in de browser.

   Zonder SANITY_PROJECT_ID bouwt de site volledig uit src/inhoud/seed.json.
   Met project-ID komt de inhoud uit Sanity; ontbreekt daar een onderdeel
   (bijvoorbeeld vóór de eerste seed-import), dan vult de seed dat stuk aan,
   zodat de build nooit een halve pagina oplevert. */

import { createClient } from '@sanity/client';
import seed from '../inhoud/seed.json';
import type { SanityBeeld } from './beeld';

type Basis = typeof seed;

/* De seed kent geen fotovelden (die bestaan alleen in Sanity), dus die worden
   hier als optioneel bijgetypt. Leeg veld betekent: standaardfoto uit de repo. */
export type Inhoud = Basis & {
  hero: { foto?: SanityBeeld };
  marco: { foto?: SanityBeeld };
  pakketten: { achtergrondFoto?: SanityBeeld };
  scenarios: { items: Array<Basis['scenarios']['items'][number] & { foto?: SanityBeeld }> };
  taglineFoto?: SanityBeeld;
};

type Taal = 'nl' | 'en';

/* Sanity slaat elk tekstveld op als { nl, en }. Dit vouwt zo'n boom plat naar
   één taal, met nl als vangnet zolang de Engelse velden nog leeg zijn. */
function lokaliseer(waarde: unknown, taal: Taal): unknown {
  if (Array.isArray(waarde)) return waarde.map((v) => lokaliseer(v, taal));
  if (waarde && typeof waarde === 'object') {
    // Afbeeldingen ongemoeid laten: de asset-referentie en hotspot zijn nodig
    // om de foto op de Sanity-CDN op te bouwen
    if ((waarde as { _type?: string })._type === 'image') return waarde;
    const sleutels = Object.keys(waarde as Record<string, unknown>).filter((k) => !k.startsWith('_'));
    if (sleutels.length > 0 && sleutels.every((k) => k === 'nl' || k === 'en')) {
      const veld = waarde as { nl?: string; en?: string };
      return veld[taal] ?? veld.nl ?? '';
    }
    return Object.fromEntries(
      Object.entries(waarde as Record<string, unknown>)
        .filter(([k]) => !k.startsWith('_'))
        .map(([k, v]) => [k, lokaliseer(v, taal)]),
    );
  }
  return waarde;
}

const QUERY = `{
  "pagina": *[_id == "pagina"][0],
  "instellingen": *[_id == "instellingen"][0],
  "pakketten": *[_type == "pakket"] | order(volgorde asc),
  "scenarios": *[_type == "scenario"] | order(volgorde asc),
  "vragen": *[_type == "vraag"] | order(volgorde asc)
}`;

export async function haalInhoud(taal: Taal = 'nl'): Promise<Inhoud> {
  const projectId = import.meta.env.SANITY_PROJECT_ID;
  if (!projectId) return seed as Inhoud;

  const client = createClient({
    projectId,
    dataset: import.meta.env.SANITY_DATASET || 'production',
    apiVersion: '2026-07-01',
    useCdn: false,
  });

  const ruw = (await client.fetch(QUERY)) as Record<string, unknown>;
  const p = lokaliseer(ruw.pagina, taal) as Record<string, any> | null;
  const inst = lokaliseer(ruw.instellingen, taal) as Record<string, any> | null;
  const pakketten = (lokaliseer(ruw.pakketten, taal) as any[]) ?? [];
  const scenarios = (lokaliseer(ruw.scenarios, taal) as any[]) ?? [];
  const vragen = (lokaliseer(ruw.vragen, taal) as any[]) ?? [];

  const xl = pakketten.find((k) => k.code === 'XL');
  const kaarten = pakketten.filter((k) => k.code !== 'XL');

  return {
    hero: p?.hero ?? seed.hero,
    zekerheden: p?.zekerheden ?? seed.zekerheden,
    maandbedrag: p?.maandbedrag ?? seed.maandbedrag,
    pakketten: {
      ...(p?.pakkettenSectie ?? {
        railLabel: seed.pakketten.railLabel,
        railNote: seed.pakketten.railNote,
        kop: seed.pakketten.kop,
        lede: seed.pakketten.lede,
        ctaTekst: seed.pakketten.ctaTekst,
      }),
      kaarten: kaarten.length ? kaarten : seed.pakketten.kaarten,
      xl: xl ?? seed.pakketten.xl,
    },
    werkwijze: p?.werkwijze ?? seed.werkwijze,
    scenarios: {
      ...(p?.scenariosSectie ?? {
        railLabel: seed.scenarios.railLabel,
        railNote: seed.scenarios.railNote,
        kop: seed.scenarios.kop,
      }),
      items: scenarios.length ? scenarios : seed.scenarios.items,
    },
    marco: p?.marco ?? seed.marco,
    tagline: p?.tagline ?? seed.tagline,
    taglineFoto: p?.taglineFoto ?? undefined,
    vragen: vragen.length ? vragen : seed.vragen,
    contact: {
      label: p?.contactSectie?.label ?? seed.contact.label,
      kop: p?.contactSectie?.kop ?? seed.contact.kop,
      lede: p?.contactSectie?.lede ?? seed.contact.lede,
      formulier: p?.formulier ?? seed.contact.formulier,
    },
    instellingen: inst ?? seed.instellingen,
  } as Inhoud;
}

/* Prijsweergave: "95 euro" of "vanaf 695 euro". Bedrag als getal in het CMS,
   zodat Marco alleen een getal hoeft aan te passen. */
export function prijsTekst(p: { prijsBedrag: number; vanaf: boolean }): string {
  return `${p.vanaf ? 'vanaf ' : ''}${p.prijsBedrag} euro`;
}

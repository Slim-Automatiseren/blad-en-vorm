/* Inhoudslaag. Bouwtijd-only: de site is statisch, dit draait nooit in de browser.

   Zonder SANITY_PROJECT_ID bouwt de site volledig uit src/inhoud/seed.json (nl)
   of src/inhoud/seed-en.json (en). Met project-ID komt de inhoud uit Sanity;
   ontbreekt daar een onderdeel (bijvoorbeeld vóór de eerste seed-import), dan
   vult de bijbehorende seed dat stuk aan, zodat de build nooit een halve
   pagina oplevert. */

import { createClient } from '@sanity/client';
import seed from '../inhoud/seed.json';
import seedEn from '../inhoud/seed-en.json';
import type { SanityBeeld } from './beeld';

type Basis = typeof seed;
type Taal = 'nl' | 'en';

/* De seed kent geen fotovelden (die bestaan alleen in Sanity), dus die worden
   hier als optioneel bijgetypt. Leeg veld betekent: standaardfoto uit de repo. */
export type Inhoud = Basis & {
  hero: Basis['hero'] & { foto?: SanityBeeld };
  inspiratie: Basis['inspiratie'] & {
    items: Array<Basis['inspiratie']['items'][number] & { foto?: SanityBeeld }>;
  };
  filosofie: Basis['filosofie'] & { foto?: SanityBeeld };
  inspiratieboek: Basis['inspiratieboek'] & { foto?: SanityBeeld };
  pakketten: Basis['pakketten'] & {
    achtergrondFoto?: SanityBeeld;
    kaarten: Array<Basis['pakketten']['kaarten'][number] & { foto?: SanityBeeld }>;
  };
  over: Basis['over'] & { foto?: SanityBeeld };
};

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
  "inspiratiebeelden": *[_type == "inspiratiebeeld"] | order(volgorde asc)
}`;

export async function haalInhoud(taal: Taal = 'nl'): Promise<Inhoud> {
  const basis: Basis = taal === 'en' ? (seedEn as Basis) : seed;
  const projectId = import.meta.env.SANITY_PROJECT_ID;
  if (!projectId) return basis as Inhoud;

  const client = createClient({
    projectId,
    dataset: import.meta.env.SANITY_DATASET || 'production',
    apiVersion: '2026-07-01',
    useCdn: false,
  });

  const ruw = (await client.fetch(QUERY)) as Record<string, unknown>;
  const ruwePagina = lokaliseer(ruw.pagina, taal) as Record<string, any> | null;
  const inst = lokaliseer(ruw.instellingen, taal) as Record<string, any> | null;
  const ruwePakketten = (lokaliseer(ruw.pakketten, taal) as any[]) ?? [];
  const inspiratiebeelden = (lokaliseer(ruw.inspiratiebeelden, taal) as any[]) ?? [];

  /* Overgangsslot: zolang de dataset nog de oude paginastructuur heeft (van vóór
     de tekstaanlevering van 26 juli, herkenbaar aan het ontbreken van de
     filosofie-groep) bouwen we volledig uit de seed. Zo kan de nieuwe code live
     zonder dat de volgorde push/herimport uitmaakt. */
  const p = ruwePagina?.filosofie ? ruwePagina : null;
  const pakketten = p ? ruwePakketten : [];

  return {
    nav: p?.nav ?? basis.nav,
    hero: p?.hero ?? basis.hero,
    inspiratie: {
      ...(p?.inspiratieSectie ?? {
        railLabel: basis.inspiratie.railLabel,
        railNote: basis.inspiratie.railNote,
        kop: basis.inspiratie.kop,
        lede: basis.inspiratie.lede,
      }),
      items: inspiratiebeelden.length ? inspiratiebeelden : basis.inspiratie.items,
    },
    filosofie: p?.filosofie ?? basis.filosofie,
    diensten: p?.dienstenSectie ?? basis.diensten,
    inspiratieboek: p?.inspiratieboek ?? basis.inspiratieboek,
    pakketten: {
      ...basis.pakketten,
      ...(p?.pakkettenSectie ?? {}),
      kaarten: pakketten.length ? pakketten : basis.pakketten.kaarten,
    },
    over: p?.over ?? basis.over,
    contact: {
      label: p?.contactSectie?.label ?? basis.contact.label,
      kop: p?.contactSectie?.kop ?? basis.contact.kop,
      lede: p?.contactSectie?.lede ?? basis.contact.lede,
      labelEmail: p?.contactSectie?.labelEmail ?? basis.contact.labelEmail,
      labelTelefoon: p?.contactSectie?.labelTelefoon ?? basis.contact.labelTelefoon,
      labelWerkgebied: p?.contactSectie?.labelWerkgebied ?? basis.contact.labelWerkgebied,
      werkgebiedTekst: p?.contactSectie?.werkgebiedTekst ?? basis.contact.werkgebiedTekst,
      formulier: p?.formulier ?? basis.contact.formulier,
    },
    /* Samengevoegd in plaats van alles-of-niets: een nieuw veld dat Marco nog
       niet heeft ingevuld (bijvoorbeeld privacyLabel) valt per veld terug op de
       seed. Vóór de herimport geldt ook hier het overgangsslot. */
    instellingen: p && inst ? { ...basis.instellingen, ...inst } : basis.instellingen,
  } as Inhoud;
}

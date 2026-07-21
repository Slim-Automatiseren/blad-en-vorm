/* Foto's uit Sanity (eigen beheer van Marco). Elk beeldslot valt terug op de
   meegebouwde standaardfoto zodra het veld in Sanity leeg is; de curatie- en
   compositie-eisen staan in docs/beeld.md van het projectarchief. */

import imageUrlBuilder from '@sanity/image-url';

export interface SanityBeeld {
  _type: 'image';
  asset?: { _ref: string };
  alt?: string;
  [sleutel: string]: unknown;
}

let bouwer: ReturnType<typeof imageUrlBuilder> | null = null;

function geefBouwer() {
  if (!bouwer) {
    bouwer = imageUrlBuilder({
      projectId: import.meta.env.SANITY_PROJECT_ID,
      dataset: import.meta.env.SANITY_DATASET || 'production',
    });
  }
  return bouwer;
}

export interface BeeldBron {
  src: string;
  srcset: string;
  alt?: string;
}

/* Bouwt src en srcset op de Sanity-CDN. Met een ratio (hoogte gedeeld door
   breedte) wordt er op maat gesneden, met respect voor de hotspot die Marco
   in de studio zet. */
export function beeldBron(
  foto: SanityBeeld | undefined | null,
  breedtes: number[],
  ratio?: number,
): BeeldBron | null {
  if (!foto?.asset?._ref || !import.meta.env.SANITY_PROJECT_ID) return null;

  const basis = geefBouwer().image(foto).auto('format');
  const maat = (breedte: number) => {
    let b = basis.width(breedte);
    if (ratio) b = b.height(Math.round(breedte * ratio)).fit('crop');
    return b.url();
  };

  const grootste = breedtes[breedtes.length - 1];
  return {
    src: maat(grootste),
    srcset: breedtes.map((b) => `${maat(b)} ${b}w`).join(', '),
    alt: typeof foto.alt === 'string' && foto.alt ? foto.alt : undefined,
  };
}

import type { Inhoud } from './inhoud';
export function vragenSchema(vragen: Inhoud['vragen']) {
  /* FAQPage moet exact overeenkomen met wat de bezoeker ziet, anders is het
     misleidend voor Google. Daarom uit dezelfde bron als de sectie zelf. */
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: vragen.items.map((v) => ({
      '@type': 'Question',
      name: v.vraag,
      acceptedAnswer: { '@type': 'Answer', text: v.antwoord },
    })),
  };
}

import logoHexagon from '../beelden/logo-hexagon.png';
import heroBreed from '../beelden/hero-breed.jpg';

/* LocalBusiness-gegevens voor Google, gevoed uit dezelfde instellingen als de
   footer zodat schema en zichtbare site nooit uit elkaar lopen. sameAs vult
   zich vanzelf zodra de social-URL's in Sanity staan. */
export function bedrijfsSchema(
  instellingen: Inhoud['instellingen'],
  taal: 'nl' | 'en',
  site: URL,
) {
  const sameAs = [instellingen.linkedinUrl, instellingen.instagramUrl].filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': new URL('/#bedrijf', site).href,
    name: 'Blad & Vorm',
    legalName: 'Hilforce',
    description: instellingen.branche,
    slogan: instellingen.voetTagline,
    url: new URL(taal === 'en' ? '/en/' : '/', site).href,
    logo: new URL(logoHexagon.src, site).href,
    image: new URL(heroBreed.src, site).href,
    telephone: instellingen.telefoonInternationaal,
    email: instellingen.email,
    vatID: 'NL005445661B23',
    identifier: { '@type': 'PropertyValue', propertyID: 'KVK', value: '42033993' },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Anemonenweg 30',
      postalCode: '2241 XL',
      addressLocality: 'Wassenaar',
      addressCountry: 'NL',
    },
    areaServed: instellingen.werkgebied
      .split('·')
      .map((p) => p.trim())
      .filter(Boolean)
      .map((naam) => ({ '@type': 'City', name: naam })),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

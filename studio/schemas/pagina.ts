import { defineArrayMember, defineField, defineType } from 'sanity';

/* Alle teksten van de one-pager, per sectie gegroepeerd. Foto's staan ook in
   het CMS (eigen beheer van Marco); een leeg fotoveld valt terug op de
   standaardfoto in de site. De inspiratiebeelden (de twee schuivende
   beeldstroken) staan als eigen documenttype 'inspiratiebeeld', niet hier.
   Curatie-eisen voor beeld staan in docs/beeld.md in het projectarchief. */

const s = (naam: string, titel: string) =>
  defineField({ name: naam, title: titel, type: 'taalString' });
const t = (naam: string, titel: string) =>
  defineField({ name: naam, title: titel, type: 'taalTekst' });

const altVeld = defineField({
  name: 'alt',
  title: 'Korte beschrijving van de foto (voor schermlezers)',
  type: 'string',
});

const foto = (naam: string, titel: string, omschrijving: string, metAlt = true) =>
  defineField({
    name: naam,
    title: titel,
    type: 'image',
    options: { hotspot: true },
    fields: metAlt ? [altVeld] : [],
    description: omschrijving,
  });

export const pagina = defineType({
  name: 'pagina',
  title: 'Pagina',
  type: 'document',
  groups: [
    { name: 'navigatie', title: 'Navigatie' },
    { name: 'hero', title: 'Hero' },
    { name: 'inspiratie', title: 'Inspiratie' },
    { name: 'filosofie', title: 'Filosofie' },
    { name: 'diensten', title: 'Diensten' },
    { name: 'inspiratieboek', title: 'Inspiration Book' },
    { name: 'pakketten', title: 'Pakketten' },
    { name: 'over', title: 'Over' },
    { name: 'contact', title: 'Contact en formulier' },
  ],
  fields: [
    defineField({
      name: 'nav',
      title: 'Navigatie (menu bovenin)',
      type: 'object',
      group: 'navigatie',
      fields: [
        s('inspiratie', 'Menu-item: Inspiratie'),
        s('diensten', 'Menu-item: Diensten'),
        s('contact', 'Menu-item: Contact'),
      ],
    }),
    defineField({
      name: 'hero',
      title: 'Hero (bovenkant van de pagina)',
      type: 'object',
      group: 'hero',
      fields: [
        s('kop', 'Kop'),
        s('sub', 'Subregel onder de kop'),
        t('intro', 'Introductietekst'),
        s('ctaPrimair', 'Groene knop'),
        s('ctaPrimairKort', 'Groene knop, korte versie (bijvoorbeeld voor mobiel)'),
        s('ctaSecundair', 'Tweede knop'),
        s('cueTekst', 'Tekst bij de scroll-cue naar Inspiratie'),
        foto(
          'foto',
          'Foto (paginabreed achter de hero)',
          'De tekst staat over de linkerhelft van deze foto heen. Kies dus een foto waarvan de linkerkant rustig en licht is, met het onderwerp rechts.',
        ),
      ],
    }),
    defineField({
      name: 'inspiratieSectie',
      title: 'Inspiratie (koppen; de beelden zelf staan als eigen lijst)',
      type: 'object',
      group: 'inspiratie',
      fields: [
        s('railLabel', 'Label in de linkerkolom'),
        s('railNote', 'Notitie in de linkerkolom'),
        s('kop', 'Kop'),
        t('lede', 'Intro'),
      ],
    }),
    defineField({
      name: 'filosofie',
      title: 'Filosofie',
      type: 'object',
      group: 'filosofie',
      fields: [
        s('railLabel', 'Label in de linkerkolom'),
        s('railNote', 'Notitie in de linkerkolom'),
        defineField({
          name: 'kop',
          title: 'Kop, eerste regel',
          type: 'taalString',
          description: 'Vormt samen met "Kop, tweede regel" de eerste twee regels van de kop.',
        }),
        defineField({
          name: 'kopVervolg',
          title: 'Kop, tweede regel',
          type: 'taalString',
          description:
            'Tweede regel van de kop, sluit aan op "Kop, eerste regel" en loopt door naar het cursieve slot (kopAccent).',
        }),
        defineField({
          name: 'kopAccent',
          title: 'Kop, cursief slot (gouden onderstreping)',
          type: 'taalString',
          description:
            'Het cursieve slotwoord of de slotzin van de kop. Krijgt op de site een gouden onderstreping.',
        }),
        t('tekst', 'Tekst'),
        foto('foto', 'Foto', 'Sfeerfoto bij de filosofietekst.'),
      ],
    }),
    defineField({
      name: 'dienstenSectie',
      title: 'Diensten',
      type: 'object',
      group: 'diensten',
      fields: [
        s('railLabel', 'Label in de linkerkolom'),
        s('railNote', 'Notitie in de linkerkolom'),
        s('kop', 'Kop'),
        defineField({
          name: 'kaarten',
          title: 'De vier dienstenkaarten',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'dienst',
              title: 'Dienst',
              type: 'object',
              fields: [
                defineField({
                  name: 'icoon',
                  title: 'Icoon',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Blad in kader (advies)', value: 'advies' },
                      { title: 'Bezorgwagen (levering)', value: 'levering' },
                      { title: 'Druppel (onderhoud)', value: 'onderhoud' },
                      { title: 'Pijlen rond (vervanging)', value: 'vervanging' },
                    ],
                  },
                }),
                s('titel', 'Titel'),
                s('tekst', 'Tekst'),
              ],
              preview: { select: { title: 'titel.nl' } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'inspiratieboek',
      title: 'Inspiration Book',
      type: 'object',
      group: 'inspiratieboek',
      fields: [
        s('label', 'Label'),
        s('kop', 'Kop'),
        t('tekst', 'Tekst'),
        s('ctaTekst', 'Knoptekst'),
        foto(
          'foto',
          'Foto',
          'Foto van het Inspiration Book, bijvoorbeeld opengeslagen naast stalen en materialen.',
        ),
      ],
    }),
    defineField({
      name: 'pakkettenSectie',
      title: 'Pakketten (koppen; de pakketten zelf staan als eigen lijst)',
      type: 'object',
      group: 'pakketten',
      fields: [
        s('railLabel', 'Label in de linkerkolom'),
        s('railNote', 'Notitie in de linkerkolom'),
        s('kop', 'Kop'),
        s('prijsVanaf', 'Prijsindicatie onder de pakketkaarten'),
        s('prijsToelichting', 'Toelichting achter de prijsindicatie'),
        s('ctaTekst', 'Knoptekst op elke pakketkaart, springt naar het formulier'),
        foto(
          'achtergrondFoto',
          'Achtergrondfoto',
          'Decoratief. Krijgt een donkergroene waas over zich heen, details vallen weg en structuur blijft. Een foto met rustige vormen werkt het best.',
          false,
        ),
      ],
    }),
    defineField({
      name: 'over',
      title: 'Over Blad & Vorm',
      type: 'object',
      group: 'over',
      fields: [
        s('railLabel', 'Label in de linkerkolom'),
        s('kop', 'Kop'),
        t('tekst1', 'Eerste alinea'),
        t('tekst2', 'Tweede alinea'),
        foto('foto', 'Foto', 'Sfeerfoto bij deze sectie.'),
      ],
    }),
    defineField({
      name: 'contactSectie',
      title: 'Contact',
      type: 'object',
      group: 'contact',
      fields: [
        s('label', 'Label'),
        s('kop', 'Kop'),
        t('lede', 'Intro'),
        s('labelEmail', 'Label: e-mail'),
        s('labelTelefoon', 'Label: telefoon'),
        s('labelWerkgebied', 'Label: werkgebied'),
        t('werkgebiedTekst', 'Tekst: werkgebied'),
      ],
    }),
    defineField({
      name: 'formulier',
      title: 'Formulier',
      type: 'object',
      group: 'contact',
      fields: [
        s('veldNaam', 'Veld: naam'),
        s('veldBedrijf', 'Veld: bedrijf'),
        s('veldBedrijfToevoeging', 'Toevoeging bij bedrijf'),
        s('veldEmail', 'Veld: e-mail'),
        s('veldTelefoon', 'Veld: telefoon'),
        s('veldTelefoonToevoeging', 'Toevoeging bij telefoon'),
        s('veldPakket', 'Veld: pakketkeuze'),
        s('keuzePlaceholder', 'Eerste regel in het keuzemenu'),
        s('optieWeetNiet', 'Laatste keuze in het menu'),
        s('veldBericht', 'Veld: bericht'),
        s('berichtPlaceholder', 'Voorbeeldtekst in het berichtveld'),
        s('knop', 'Verstuurknop'),
        s('privacy', 'Privacyregel onder de knop'),
        s('foutmelding', 'Melding als versturen mislukt'),
        s('succesKop', 'Kop na verzenden'),
        s('succesTekst', 'Tekst na verzenden'),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Pagina' }) },
});

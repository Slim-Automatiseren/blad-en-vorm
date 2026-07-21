import { defineArrayMember, defineField, defineType } from 'sanity';

/* Alle teksten van de one-pager, per sectie gegroepeerd. Foto's staan ook in
   het CMS (eigen beheer van Marco); een leeg fotoveld valt terug op de
   standaardfoto in de site. Bij de kwetsbare slots staat een adviesregel,
   de curatie-eisen staan in docs/beeld.md in het projectarchief. */

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
    { name: 'hero', title: 'Hero' },
    { name: 'zekerheden', title: 'Zekerheden' },
    { name: 'maandbedrag', title: 'Maandbedrag' },
    { name: 'pakketten', title: 'Pakketten' },
    { name: 'werkwijze', title: 'Werkwijze' },
    { name: 'scenarios', title: "Scenario's" },
    { name: 'marco', title: 'Over Marco' },
    { name: 'contact', title: 'Contact en formulier' },
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero (bovenkant van de pagina)',
      type: 'object',
      group: 'hero',
      fields: [
        s('label', 'Label boven de kop'),
        s('kop', 'Kop'),
        s('kopAccent', 'Kop, benadrukt deel (cursief met gouden lijn)'),
        t('sub', 'Tekst onder de kop'),
        s('ctaPrimair', 'Groene knop'),
        s('ctaSecundair', 'Tweede knop'),
        s('fineprint', 'Kleine regel onder de knoppen'),
        foto(
          'foto',
          'Foto (paginabreed achter de hero)',
          'De tekst staat over de linkerhelft van deze foto heen. Kies dus een foto waarvan de linkerkant rustig en licht is, met het onderwerp rechts.',
        ),
        defineField({
          name: 'meta',
          title: 'Drie feiten onderin de hero',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'metaItem',
              title: 'Feit',
              type: 'object',
              fields: [s('label', 'Label'), s('waarde', 'Waarde')],
              preview: {
                select: { title: 'waarde.nl', subtitle: 'label.nl' },
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'zekerheden',
      title: 'Zekerhedenstrip (vinkjes onder de hero)',
      type: 'array',
      group: 'zekerheden',
      of: [defineArrayMember({ type: 'taalString' })],
      validation: (regel) => regel.max(4).warning('Vier past het mooist op één regel.'),
    }),
    defineField({
      name: 'maandbedrag',
      title: 'Wat zit er in het maandbedrag',
      type: 'object',
      group: 'maandbedrag',
      fields: [
        s('railLabel', 'Label in de linkerkolom'),
        s('railNote', 'Notitie in de linkerkolom'),
        s('kop', 'Kop'),
        t('lede', 'Intro'),
        defineField({
          name: 'pijlers',
          title: 'De zes pijlers',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'pijler',
              title: 'Pijler',
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
                      { title: 'Persoon (aanspreekpunt)', value: 'aanspreekpunt' },
                      { title: 'Kalender met vinkje (maandbedrag)', value: 'maandbedrag' },
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
      name: 'pakkettenSectie',
      title: 'Pakketten (koppen; de pakketten zelf staan als eigen lijst)',
      type: 'object',
      group: 'pakketten',
      fields: [
        s('railLabel', 'Label in de linkerkolom'),
        s('railNote', 'Notitie in de linkerkolom'),
        s('kop', 'Kop'),
        t('lede', 'Intro'),
        s('ctaTekst', 'Knoptekst op elke pakketkaart'),
        foto(
          'achtergrondFoto',
          'Achtergrondfoto',
          'Decoratief. Krijgt een donkergroene waas over zich heen, details vallen weg en structuur blijft. Een foto met rustige vormen werkt het best.',
          false,
        ),
      ],
    }),
    defineField({
      name: 'werkwijze',
      title: 'Werkwijze',
      type: 'object',
      group: 'werkwijze',
      fields: [
        s('railLabel', 'Label in de linkerkolom'),
        s('railNote', 'Notitie in de linkerkolom'),
        s('kop', 'Kop'),
        defineField({
          name: 'stappen',
          title: 'De vier stappen (nummering gaat vanzelf)',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'stap',
              title: 'Stap',
              type: 'object',
              fields: [s('titel', 'Titel'), s('tekst', 'Tekst')],
              preview: { select: { title: 'titel.nl' } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'scenariosSectie',
      title: "Scenario's (koppen; de scenario's zelf staan als eigen lijst)",
      type: 'object',
      group: 'scenarios',
      fields: [
        s('railLabel', 'Label in de linkerkolom'),
        s('railNote', 'Notitie in de linkerkolom'),
        s('kop', 'Kop'),
      ],
    }),
    defineField({
      name: 'marco',
      title: 'Over Marco',
      type: 'object',
      group: 'marco',
      fields: [
        s('label', 'Label'),
        s('kop', 'Kop'),
        t('tekst', 'Tekst'),
        foto(
          'foto',
          'Foto van Marco',
          'Staande foto, wordt 3:4 uitgesneden. Zet het rondje (de hotspot) op het gezicht. Zolang dit veld leeg is toont de site "Foto volgt".',
        ),
      ],
    }),
    defineField({
      ...s('tagline', 'Tagline in de brede beeldband'),
      group: 'marco',
    }),
    defineField({
      ...foto(
        'taglineFoto',
        'Foto achter de tagline-band',
        'Decoratief, paginabreed. Krijgt een donkere waas met de tagline eroverheen; een foto met diepte en rustige tinten werkt het best.',
        false,
      ),
      group: 'marco',
    }),
    defineField({
      name: 'contactSectie',
      title: 'Contact',
      type: 'object',
      group: 'contact',
      fields: [s('label', 'Label'), s('kop', 'Kop'), t('lede', 'Intro')],
    }),
    defineField({
      name: 'formulier',
      title: 'Formulier',
      type: 'object',
      group: 'contact',
      fields: [
        s('veldNaam', 'Veld: naam'),
        s('veldBedrijf', 'Veld: bedrijf'),
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

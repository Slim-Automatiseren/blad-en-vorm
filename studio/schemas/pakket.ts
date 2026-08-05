import { defineArrayMember, defineField, defineType } from 'sanity';

export const pakket = defineType({
  name: 'pakket',
  title: 'Pakket',
  type: 'document',
  fields: [
    defineField({
      name: 'code',
      title: 'Maat',
      type: 'string',
      options: { list: ['S', 'M', 'L', 'XL'], layout: 'radio', direction: 'horizontal' },
      validation: (regel) => regel.required(),
      description: 'Bepaalt de standaardfoto en de vaste volgorde van klein naar groot.',
    }),
    defineField({
      name: 'naam',
      title: 'Naam',
      type: 'string',
      validation: (regel) => regel.required(),
    }),
    defineField({
      name: 'foto',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
      description:
        'Sfeerbeeld bovenin de kaart; de reeks toont per pakket iets meer groen. Leeg veld betekent: standaardfoto uit de site.',
    }),
    defineField({
      name: 'beschrijving',
      title: 'Beschrijving',
      type: 'taalTekst',
      description: 'Eén korte zin onder de prijs.',
    }),
    defineField({
      name: 'punten',
      title: 'Opsommingspunten',
      type: 'array',
      of: [defineArrayMember({ type: 'taalString' })],
      description: 'Korte specificaties, drie of vier regels per kaart.',
    }),
    defineField({
      name: 'volgorde',
      title: 'Volgorde',
      type: 'number',
      validation: (regel) => regel.required(),
    }),
  ],
  orderings: [
    { name: 'volgorde', title: 'Volgorde', by: [{ field: 'volgorde', direction: 'asc' }] },
  ],
  /* De naam voorop, net als op de site; de maat eronder als hulpje bij het
     sorteren. De codes S/M/L/XL staan bewust niet op de pagina zelf. */
  preview: {
    select: { code: 'code', naam: 'naam' },
    prepare: ({ code, naam }) => ({
      title: naam ?? 'Naamloos pakket',
      subtitle: code ? `Maat ${code}` : undefined,
    }),
  },
});

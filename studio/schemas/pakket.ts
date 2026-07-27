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
      description: 'S, M en L staan als kaarten naast elkaar; XL krijgt de brede band eronder.',
    }),
    defineField({
      name: 'naam',
      title: 'Naam',
      type: 'string',
      validation: (regel) => regel.required(),
    }),
    defineField({
      name: 'prijsBedrag',
      title: 'Prijs per maand (alleen het getal, in euro)',
      type: 'number',
      description: 'Wordt momenteel niet op de site getoond; prijzen gaan via het persoonlijke voorstel.',
      validation: (regel) => regel.positive(),
    }),
    defineField({
      name: 'vanaf',
      title: 'Toon als "vanaf"-prijs',
      type: 'boolean',
      description: 'Wordt momenteel niet op de site getoond; prijzen gaan via het persoonlijke voorstel.',
      initialValue: false,
    }),
    defineField({
      name: 'beschrijving',
      title: 'Beschrijving',
      type: 'taalTekst',
      description: 'Bij S, M en L één korte zin; bij XL de volledige omschrijving.',
    }),
    defineField({
      name: 'punten',
      title: 'Opsommingspunten (alleen S, M en L)',
      type: 'array',
      of: [defineArrayMember({ type: 'taalString' })],
      description: 'Wordt momenteel niet op de site getoond; prijzen gaan via het persoonlijke voorstel.',
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
  preview: {
    select: { code: 'code', naam: 'naam', prijs: 'prijsBedrag' },
    prepare: ({ code, naam, prijs }) => ({
      title: `${code ?? ''} ${naam ?? ''}`.trim(),
      subtitle: prijs ? `${prijs} euro per maand` : undefined,
    }),
  },
});

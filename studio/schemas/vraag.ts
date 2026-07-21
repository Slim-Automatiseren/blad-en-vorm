import { defineField, defineType } from 'sanity';

export const vraag = defineType({
  name: 'vraag',
  title: 'Veelgestelde vraag',
  type: 'document',
  fields: [
    defineField({ name: 'vraag', title: 'Vraag', type: 'taalString' }),
    defineField({ name: 'antwoord', title: 'Antwoord', type: 'taalTekst' }),
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
  preview: { select: { title: 'vraag.nl' } },
});

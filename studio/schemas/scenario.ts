import { defineField, defineType } from 'sanity';

export const scenario = defineType({
  name: 'scenario',
  title: 'Scenario',
  type: 'document',
  fields: [
    defineField({ name: 'titel', title: 'Titel', type: 'taalString' }),
    defineField({ name: 'tekst', title: 'Tekst', type: 'taalTekst' }),
    defineField({
      name: 'pastBij',
      title: 'Verwijzing naar een pakket (bijvoorbeeld "Past bij S Impact")',
      type: 'taalString',
    }),
    defineField({
      name: 'foto',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Korte beschrijving van de foto (voor schermlezers)',
          type: 'string',
        }),
      ],
      description:
        'Wordt 4:3 getoond; zet het rondje (de hotspot) op het belangrijkste deel. Leeg laten kan ook, dan geldt de standaardfoto hieronder.',
    }),
    defineField({
      name: 'beeldSlot',
      title: 'Standaardfoto (als er geen eigen foto staat)',
      type: 'string',
      options: {
        list: [
          { title: 'Ontvangstruimte', value: 'ontvangst' },
          { title: 'Directie en vergaderruimte', value: 'directie' },
          { title: 'Praktijk en wellness', value: 'praktijk' },
          { title: 'Geen foto', value: 'geen' },
        ],
      },
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
  preview: { select: { title: 'titel.nl' } },
});

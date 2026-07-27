import { defineField, defineType } from 'sanity';

/* De inspiratiebeelden vormen de twee schuivende beeldstroken in de
   Inspiratie-sectie: rij 1 bovenin, rij 2 eronder. Elk beeld heeft een
   standaardfoto (beeldSlot) die getoond wordt zolang het fotoveld leeg is,
   zodat Marco een eigen foto kan uploaden zonder dat de strook leeg blijft.
   Curatie-eisen voor beeld staan in docs/beeld.md in het projectarchief. */

export const inspiratiebeeld = defineType({
  name: 'inspiratiebeeld',
  title: 'Inspiratiebeeld',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label (bijschrift onder de foto)',
      type: 'taalString',
      validation: (regel) => regel.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt-tekst',
      type: 'taalString',
      description: 'Alternatieve tekst voor de foto (voor schermlezers).',
    }),
    defineField({
      name: 'foto',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
      description:
        'Niet verplicht. Een leeg veld betekent dat de standaardfoto uit de repository getoond wordt, gekoppeld aan het beeldslot hieronder.',
    }),
    defineField({
      name: 'beeldSlot',
      title: 'Beeldslot (bepaalt de standaardfoto)',
      type: 'string',
      options: {
        list: [
          { title: 'Boutique hotel', value: 'hotel' },
          { title: 'Makelaarskantoor', value: 'makelaar' },
          { title: 'Directiekantoor', value: 'directie' },
          { title: 'Praktijk en wellness', value: 'praktijk' },
          { title: 'Ontvangstruimte', value: 'ontvangst' },
          { title: 'Villa', value: 'villa' },
          { title: 'Tandartspraktijk', value: 'tandarts' },
          { title: 'Lobby', value: 'lobby' },
        ],
      },
    }),
    defineField({
      name: 'rij',
      title: 'Rij',
      type: 'number',
      options: { list: [1, 2], layout: 'radio', direction: 'horizontal' },
      description: 'Rij 1 (bovenste strook) schuift naar rechts, rij 2 (onderste strook) naar links.',
      validation: (regel) => regel.required().min(1).max(2),
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
    select: { title: 'label.nl', media: 'foto' },
  },
});

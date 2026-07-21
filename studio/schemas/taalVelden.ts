import { defineField, defineType } from 'sanity';

/* Elk tekstveld bestaat in twee talen. Nederlands is verplicht en de bron;
   Engels mag leeg blijven tot de EN-versie live gaat (de site valt dan
   terug op het Nederlands). */

export const taalString = defineType({
  name: 'taalString',
  title: 'Tekst',
  type: 'object',
  fields: [
    defineField({ name: 'nl', title: 'Nederlands', type: 'string' }),
    defineField({ name: 'en', title: 'Engels', type: 'string' }),
  ],
});

export const taalTekst = defineType({
  name: 'taalTekst',
  title: 'Tekst (meerdere regels)',
  type: 'object',
  fields: [
    defineField({ name: 'nl', title: 'Nederlands', type: 'text', rows: 3 }),
    defineField({ name: 'en', title: 'Engels', type: 'text', rows: 3 }),
  ],
});

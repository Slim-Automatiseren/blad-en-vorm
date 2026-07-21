import { defineField, defineType } from 'sanity';

export const instellingen = defineType({
  name: 'instellingen',
  title: 'Instellingen',
  type: 'document',
  fields: [
    defineField({ name: 'email', title: 'E-mailadres', type: 'string' }),
    defineField({
      name: 'telefoonWeergave',
      title: 'Telefoonnummer (zoals getoond)',
      type: 'string',
    }),
    defineField({
      name: 'telefoonInternationaal',
      title: 'Telefoonnummer internationaal (+31...)',
      type: 'string',
      description: 'Wordt gebruikt voor de belknop.',
    }),
    defineField({
      name: 'whatsappNummer',
      title: 'WhatsApp-nummer (zonder + of streepjes, bijvoorbeeld 31615129685)',
      type: 'string',
    }),
    defineField({ name: 'branche', title: 'Omschrijving in de footer', type: 'taalString' }),
    defineField({ name: 'werkgebied', title: 'Werkgebied', type: 'taalString' }),
    defineField({ name: 'kvkRegel', title: 'KvK-regel in de footer', type: 'taalString' }),
    defineField({ name: 'voetTagline', title: 'Tagline in de footer', type: 'taalString' }),
  ],
  preview: { prepare: () => ({ title: 'Instellingen' }) },
});

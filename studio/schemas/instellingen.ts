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
    defineField({
      name: 'branche',
      title: 'Omschrijvingsregel in de voet',
      type: 'taalString',
      description: 'Korte omschrijving van Blad & Vorm, getoond als omschrijvingsregel in de voet van de pagina.',
    }),
    defineField({ name: 'werkgebied', title: 'Werkgebied', type: 'taalString' }),
    defineField({ name: 'kvkRegel', title: 'KvK-regel in de footer', type: 'taalString' }),
    defineField({ name: 'voetTagline', title: 'Tagline in de footer', type: 'taalString' }),
    defineField({ name: 'privacyLabel', title: 'Label: privacyverklaring', type: 'taalString' }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn-URL',
      type: 'url',
      description: 'Niet verplicht. Alleen ingevuld tonen we het icoon in de voet.',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram-URL',
      type: 'url',
      description: 'Niet verplicht. Alleen ingevuld tonen we het icoon in de voet.',
    }),
  ],
  preview: { prepare: () => ({ title: 'Instellingen' }) },
});

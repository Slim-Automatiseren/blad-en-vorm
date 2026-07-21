import { defineConfig } from 'sanity';
import { structureTool, type StructureResolver } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'nog-invullen';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

/* Twee singletons bovenaan, daarna de lijsten. Alles in het Nederlands,
   want Marco werkt hierin. */
const structuur: StructureResolver = (S) =>
  S.list()
    .title('Inhoud')
    .items([
      S.listItem()
        .title('Pagina')
        .id('pagina')
        .child(S.document().schemaType('pagina').documentId('pagina')),
      S.listItem()
        .title('Instellingen')
        .id('instellingen')
        .child(S.document().schemaType('instellingen').documentId('instellingen')),
      S.divider(),
      S.documentTypeListItem('pakket').title('Pakketten'),
      S.documentTypeListItem('scenario').title("Scenario's"),
      S.documentTypeListItem('vraag').title('Veelgestelde vragen'),
    ]);

const singletons = ['pagina', 'instellingen'];

export default defineConfig({
  name: 'bladvorm',
  title: 'Blad & Vorm',
  projectId,
  dataset,
  plugins: [structureTool({ structure: structuur }), visionTool()],
  schema: {
    types: schemaTypes,
    // Singletons niet als "nieuw document" aanbieden
    templates: (vorige) => vorige.filter((t) => !singletons.includes(t.schemaType)),
  },
  document: {
    // Singletons niet laten verwijderen of dupliceren
    actions: (vorige, context) =>
      singletons.includes(context.schemaType)
        ? vorige.filter((a) => !['delete', 'duplicate'].includes(a.action ?? ''))
        : vorige,
  },
});

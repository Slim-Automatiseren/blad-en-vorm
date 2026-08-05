import { defineCliConfig } from 'sanity/cli';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'nog-invullen';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

/* De studio draait op bladenvorm.sanity.studio, gelijk aan het domein en aan
   de Netlify-naam. Hernoemd op 5 augustus 2026 (was bladvorm) met
   `sanity undeploy` gevolgd door een nieuwe deploy; de hostnaam wordt maar
   één keer gekozen, dus wijzigen kan alleen via die route. */
export default defineCliConfig({
  api: { projectId, dataset },
  studioHost: 'bladenvorm',
  deployment: { appId: 'xj5sjo59gmih0qmkqyzrwl9w' },
});

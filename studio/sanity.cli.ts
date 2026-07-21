import { defineCliConfig } from 'sanity/cli';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'nog-invullen';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

export default defineCliConfig({
  api: { projectId, dataset },
  deployment: { appId: 'id570ecftz92upbii4ylc0wy' },
});

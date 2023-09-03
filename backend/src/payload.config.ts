import { buildConfig } from 'payload/config';
import path from 'path';
// import Examples from './collections/Examples';
import Users from './collections/Users';
import Resource from './collections/Resource/Resource';
import Version from './collections/Resource/Version';
import TDVErsion from './collections/TDVersion';
import { addAuthorFields } from '@boomworks/payload-plugin-author-fields';

export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Resource,
    Version,
    TDVErsion
    // Add Collections here
    // Examples,
  ],
  plugins: [
    addAuthorFields({
      excludedCollections:[ Users.slug ],
    }),
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
})

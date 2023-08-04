import { CollectionConfig } from 'payload/types';
import { isAdmin, publicVisible } from '../Access/rules';

// Example Collection - For reference only, this must be added to payload.config.ts to be used.
const TDVErsion: CollectionConfig = {
  slug: 'tdversion',
  admin: {
    useAsTitle: 'someField',
  },
  access : {
    read : publicVisible,
    update : isAdmin,
    delete : isAdmin,
    create : isAdmin
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
        name : "downloadlink",
        type: "text"
    }
  ],
}

export default TDVErsion;
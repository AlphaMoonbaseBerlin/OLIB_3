import { CollectionConfig } from 'payload/types';
import Resource from '../Resource/Resource';
import { defaultModeratorOrOwner } from '../../Access/rules';

// Example Collection - For reference only, this must be added to payload.config.ts to be used.
const Collection: CollectionConfig = {
  slug: 'collection',
  admin: {
    useAsTitle: 'someField',
  },
  access : defaultModeratorOrOwner(),
  fields: [
    {
        name: 'name',
        type: 'text',
        required : true
    },
    {
        name :  "description",
        type : "richText"
    },
    {
      name: 'resources',
      type: "relationship",
      relationTo : Resource.slug
    },
  ],
}

export default Collection;
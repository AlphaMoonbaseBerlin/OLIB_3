import { CollectionConfig } from 'payload/types';
import Branch from './Branch';

const Resource: CollectionConfig = {
  slug: 'resource',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required : true
    },
    {
        name : "snippet",
        type : "text"
    },
    {
        name : "style",
        type : "select",
        options : ["Component", "Snippet", "Plugin", "Notch"],
        required : true
    },
    {
      name : "branches",
      type : "relationship",
      hasMany : true,
      relationTo : Branch.slug
    }
  ],
}

export default Resource;
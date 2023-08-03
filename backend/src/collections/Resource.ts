import { CollectionConfig } from 'payload/types';

import _Slugs from './_Slugs';

const Resource: CollectionConfig = {
  slug: _Slugs.Resource,
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
      relationTo : _Slugs.Branch
    }
  ],
}

export default Resource;
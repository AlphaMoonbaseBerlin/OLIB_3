import { CollectionConfig } from 'payload/types';

import _Slugs from './_Slugs';
import { defaultModeratorOrOwner } from '../../Access/rules';


const Resource: CollectionConfig = {
  slug: _Slugs.Resource,
  admin: {
    useAsTitle: 'name',
  },
  access : defaultModeratorOrOwner(),
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
    }
  ],
}

export default Resource;
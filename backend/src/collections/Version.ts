import { CollectionConfig } from 'payload/types';
import _Slugs from './_Slugs';

const Version: CollectionConfig = {
  slug: 'version',
  admin: {
    useAsTitle: 'someField',
  },
  fields: [
    {
        name : "branch",
        type : "relationship",
        relationTo : _Slugs.Branch,
        hasMany : false
    },
    {
      name: 'primary',
      type: "number",
      min : 0,
      max : 9999,
      defaultValue : 0,
      admin : {
        "step" : 1
      }
    },
    {
        name: 'secondary',
        type: "number",
        min : 0,
        max : 9999,
        defaultValue : 0,
        admin : {
          "step" : 1
        }
      },
    {
        name : "releasenotes",
        type : "textarea"
    }

  ],
}

export default Version;
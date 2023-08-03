import { CollectionConfig } from 'payload/types';

const Version: CollectionConfig = {
  slug: 'version',
  admin: {
    useAsTitle: 'someField',
  },
  fields: [
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
  ],
}

export default Version;
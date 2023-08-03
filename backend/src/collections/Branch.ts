import { CollectionConfig } from 'payload/types';
import Version from './Version';

const Branch: CollectionConfig = {
  slug: 'branch',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required : true,
      defaultValue : "v1"
    },
    {
        name: "docs",
        type : "richText",
    },
    {
        name : "versions",
        type : "relationship",
        hasMany : true,
        relationTo : Version.slug
      }
  ],
}

export default Branch;
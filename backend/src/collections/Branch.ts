import { CollectionConfig } from 'payload/types';
import _Slugs from './_Slugs';
import { findChildren } from '../hooks/Relationships';

const Branch: CollectionConfig = {
  slug: _Slugs.Branch,
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
        name : "ressource",
        type : "relationship",
        hasMany : false,
        relationTo : _Slugs.Resource
    },
    {
        name : "versions",
        type : "relationship",
        hasMany : true,
        relationTo : _Slugs.Version,
        hooks : {
            afterRead : [(args) => findChildren(_Slugs.Branch, _Slugs.Version, "branch", args)]
        }
      }
  ],
}

export default Branch;
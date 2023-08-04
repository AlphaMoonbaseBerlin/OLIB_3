import { CollectionConfig } from 'payload/types';
import _Slugs from './_Slugs';
import { manyToOne } from '../../hooks/OneWayRealtionships';
import Resource from './Resource';
import { defaultModeratorOrOwner } from '../../Access/rules';

const Branch: CollectionConfig = {
  slug: _Slugs.Branch,
  admin: {
    useAsTitle: 'name',
  },
  access : defaultModeratorOrOwner(),
  fields: [
    manyToOne(_Slugs.Branch, Resource),
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
    
  ],
}

export default Branch;
import { CollectionConfig } from 'payload/types';
import { manyToOne } from '../../hooks/OneWayRealtionships';
import Branch from './Branch';
import _Slugs from './_Slugs';
import TDVErsion from '../TDVersion';
import { defaultModeratorOrOwner } from '../../Access/rules';

const Version: CollectionConfig = {
  slug: _Slugs.Version,
  admin: {
    useAsTitle: 'someField',
  },
  upload : {
    mimeTypes : ["aplication/tox", "application/dll", "application/dfx"],
  },
  access : defaultModeratorOrOwner(),
  fields: [
    manyToOne(_Slugs.Version, Branch),
    {
      name : "tdversion",
      type : "relationship",
      relationTo : TDVErsion.slug,
      hasMany : false,
      required : true
    },
    {
      name: 'primary',
      type: "number",
      min : 0,
      max : 9999,
      defaultValue : 0,
      admin : {
        "step" : 1
      },
      required : true
    },
    {
        name: 'secondary',
        type: "number",
        min : 0,
        max : 9999,
        defaultValue : 0,
        admin : {
          "step" : 1
        },
        required : true
      },
    {
        name : "releasenotes",
        type : "textarea"
    }

  ],
}

export default Version;
import { CollectionConfig } from 'payload/types';
import { isAdmin, isItself, publicVisible } from '../Access/rules';
import { or } from '../Access/utils';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create : isAdmin,
    update : (args) => or(args,  [isAdmin, isItself]),
    delete : (args) => or(args,  [isAdmin, isItself]),
    read   : publicVisible
  },
  fields: [
    {
      name : "username",
      type : "text"
    },
    {
      name : "role",
      type : "select",
      options : ["Admin", "Moderator", "Uploader", "Viewer"],
      defaultValue : "Viewer",
      saveToJWT : true,
      admin : {
        isClearable : false
      }
    },
    {
      name : "public",
      type : "group",
      fields : [
        { 
          name : "email",
          type : "text"
        }
      ]
    }
    // Email added by default
    // Add more fields as needed
  ],
};

export default Users;
import { CollectionConfig } from 'payload/types';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
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
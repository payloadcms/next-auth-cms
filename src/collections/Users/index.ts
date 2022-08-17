import { CollectionConfig } from 'payload/types';
import { admins } from '../../access/admins';
import { adminsAndUser } from '../../access/adminsAndUser';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    // Anyone can create a user
    create: () => true,

    // Users with role 'admin' can read and update all users
    // But users with role 'customer' can only read and update their own
    read: adminsAndUser,
    update: adminsAndUser,

    // Only admins can delete
    delete: admins,
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
      saveToJWT: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
      saveToJWT: true,
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      access: {
        // Only allow admins to update the roles of a user
        update: admins,
      },
      // Default role is 'customer'
      defaultValue: ['customer'],
      options: [
        'admin',
        'customer',
      ]
    }
  ],
};

export default Users;

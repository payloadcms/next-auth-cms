import { CollectionConfig } from 'payload/types';
import { admins } from '../../access/admins';
import { adminsAndUser } from '../../access/adminsAndUser';

const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    forgotPassword: {
      generateEmailHTML: ({ token, user }) => {
        // Use the token provided to allow your user to reset their password
        // We will send them to the frontend NextJS app instead of sending
        // them to the Payload admin by default
        const resetPasswordURL = `${process.env.PAYLOAD_PUBLIC_NEXT_URL}/reset-password?token=${token}`;

        return `
          <!doctype html>
          <html>
            <body>
              <h1>Hi there</h1>
              <p>Click below to reset your password.</p>
              <p>
                <a href="${resetPasswordURL}">${resetPasswordURL}</a>
              </p>
            </body>
          </html>
        `;
      }
    },
  },
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
      options: ['admin', 'customer'],
    },
  ],
};

export default Users;

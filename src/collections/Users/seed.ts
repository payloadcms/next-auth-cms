import { Payload } from 'payload';

const adminUser = {
  email: 'dev@payloadcms.com',
  password: 'test',
  firstName: 'Jane',
  lastName: 'Doe',
};

const customerUser = {
  email: 'customer@payloadcms.com',
  password: 'test',
  firstName: 'Bob',
  lastName: 'Customer',
};

export const seedUsers = async (payload: Payload): Promise<void> => {
  // On init, we'll check to see if there is an admin user
  const adminUserQuery = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: adminUser.email,
      },
    },
  });

  // If there isn't, then seed admin user
  if (adminUserQuery.docs.length === 0) {
    await payload.create({
      collection: 'users',
      data: {
        ...adminUser,
        roles: ['admin'],
      },
    });

    payload.logger.info('Admin user seeded successfully!');
  }

  // Also check to see if there is a customer user
  const customerUserQuery = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: customerUser.email,
      },
    },
  });

  // If there isn't, then seed customer user
  if (customerUserQuery.docs.length === 0) {
    await payload.create({
      collection: 'users',
      data: {
        ...customerUser,
      },
    });

    payload.logger.info('Customer user seeded successfully!');
  }
};

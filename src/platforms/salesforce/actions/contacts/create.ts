import { client } from '@/platforms/salesforce/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'create-contact',
  {
    operation: 'create',
    resource: 'contacts',
    mutation: true,
    schema: z.object({
      email: z.string().email(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      title: z.string().optional(),
      phone: z.string().optional(),
      mobilePhone: z.string().optional(),
      accountId: z.string().optional(),
      ownerId: z.string().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.contacts.create(auth, {
      Contact: {
        Email: input.email,
        FirstName: input.firstName,
        LastName: input.lastName,
        Title: input.title,
        Phone: input.phone,
        MobilePhone: input.mobilePhone,
        AccountId: input.accountId,
        OwnerId: input.ownerId,
      },
    });
  },
);

import { transformContact } from '@/platforms/salesforce/actions/mappers';
import { client } from '@/platforms/salesforce/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'update-contact',
  {
    operation: 'update',
    resource: 'contacts',
    mutation: true,
    schema: z.object({
      id: z.string(),
      contact: z.object({
        email: z.string().email().optional(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        title: z.string().optional(),
        phone: z.string().optional(),
        mobilePhone: z.string().optional(),
        accountId: z.string().optional(),
        ownerId: z.string().optional(),
      }),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.contacts.update(auth, {
      Id: input.id,
      Contact: {
        Email: input.contact.email,
        FirstName: input.contact.firstName,
        LastName: input.contact.lastName,
        Title: input.contact.title,
        Phone: input.contact.phone,
        MobilePhone: input.contact.mobilePhone,
        AccountId: input.contact.accountId,
        OwnerId: input.contact.ownerId,
      },
    });

    return {
      ...transformContact(result.data),
      $native: result.$native,
    };
  },
);

import { transformContact } from '@/platforms/salesforce/actions/mappers';
import { client } from '@/platforms/salesforce/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'find-contact',
  {
    operation: 'find',
    resource: 'contacts',
    mutation: false,
    schema: z.object({
      id: z.string(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.contacts.find(auth, { Id: input.id });

    result.data;

    return {
      ...transformContact(result.data),
      $native: result.$native,
    };
  },
);

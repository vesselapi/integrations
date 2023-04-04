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
      id: z.number(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.contacts.find(auth, { Id: input.id });
  },
);

import { client } from '@/platforms/active-campaign/client';
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
    return await client.contacts.find(auth, {
      id: input.id,
    });
  },
);

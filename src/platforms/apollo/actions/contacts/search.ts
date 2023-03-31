import { client } from '@/platforms/apollo/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'search-contacts',
  {
    operation: 'search',
    resource: 'contacts',
    mutation: true,
    schema: z.object({
      page: z.number().optional(),
      q_keywords: z.string().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.contacts.search(auth, input);
  },
);

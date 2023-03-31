import { z } from 'zod';
import { action } from '../../../../sdk';
import { client } from '../../client';

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
    return await client.contacts.search(auth, {
      page: input.page,
      q_keywords: input.q_keywords,
    });
  },
);

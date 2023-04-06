import { transformContact } from '@/platforms/apollo/actions/mappers';
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
      qKeywords: z.string().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.contacts.search(auth, {
      page: input.page,
      q_keywords: input.qKeywords,
    });

    return {
      contacts: result.data.contacts.map(transformContact),
      $native: result.$native,
    };
  },
);

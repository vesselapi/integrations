import { z } from 'zod';
import { action } from '../../../../sdk';
import { client } from '../../client';

export default action(
  'list-contacts',
  {
    operation: 'list',
    resource: 'contacts',
    mutation: true,
    schema: z.object({
      page: z.number().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.contacts.search(auth, {
      page: input.page,
    });
  },
);

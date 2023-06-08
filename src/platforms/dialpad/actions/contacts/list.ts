import { transformContact } from '@/platforms/dialpad/actions/mappers';
import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

export default action(
  'list-contacts',
  {
    operation: 'list',
    resource: 'contacts',
    mutation: false,
    schema: z.object({
      cursor: z.string().optional(),
    }),
    scopes: [],
  },
  async ({ auth, input }) => {
    const result = await client.contacts.list(auth, input);

    return {
      cursor: result.data.cursor,
      items: result.data.items?.map(transformContact),
      $native: result.$native,
    };
  },
);

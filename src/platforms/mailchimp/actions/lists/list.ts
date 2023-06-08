import { transformList } from '@/platforms/mailchimp/actions/mappers';
import { client } from '@/platforms/mailchimp/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'list-lists',
  {
    operation: 'list',
    resource: 'lists',
    mutation: false,
    schema: z.object({
      count: z.number().optional(),
      offset: z.number().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.lists.list(auth, input);

    return {
      lists: result.data.lists.map(transformList),
      $native: result.$native,
    };
  },
);

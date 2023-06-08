import { transformList } from '@/platforms/mailchimp/actions/mappers';
import { client } from '@/platforms/mailchimp/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'find-list',
  {
    operation: 'find',
    resource: 'lists',
    mutation: false,
    schema: z.object({
      id: z.string(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.lists.find(auth, input);

    return {
      ...transformList(result.data),
      $native: result.$native,
    };
  },
);

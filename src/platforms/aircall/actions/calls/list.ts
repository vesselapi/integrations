import { z } from 'zod';
import { action } from '../../../../sdk';
import { client } from '../../client';
import { aircallUrl } from '../validators';

export default action(
  'list-calls',
  {
    operation: 'list',
    resource: 'calls',
    mutation: false,
    schema: z.object({
      from: z.string().optional(),
      per_page: z.number().optional(),
      next_page_link: aircallUrl().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.calls.list(auth, {
      from: input.from,
      per_page: input.per_page,
      next_page_link: input.next_page_link,
    });
  },
);

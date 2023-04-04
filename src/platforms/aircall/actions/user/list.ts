import * as custom from '@/sdk/validators';
import { z } from 'zod';
import { action } from '../../../../sdk';
import { client } from '../../client';
import { aircallUrl } from '../validators';

export default action(
  'list-users',
  {
    operation: 'list',
    resource: 'users',
    mutation: false,
    schema: custom.object({
      from: z.string().optional(),
      per_page: z.number().optional(),
      next_page_link: aircallUrl().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.users.list(auth, {
      from: input.from,
      per_page: input.per_page,
      next_page_link: input.next_page_link,
    });
  },
);

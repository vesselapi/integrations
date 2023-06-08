import { transformUser } from '@/platforms/aircall/actions/mappers';
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
    schema: z.object({
      from: z.string().optional(),
      perPage: z.number().optional(),
      nextPageLink: aircallUrl().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.users.list(auth, {
      from: input.from,
      per_page: input.perPage,
      next_page_link: input.nextPageLink,
    });

    return {
      users: result.data.users.map(transformUser),
      $native: result.$native,
    };
  },
);

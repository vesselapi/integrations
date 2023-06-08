import { transformCall } from '@/platforms/aircall/actions/mappers';
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
      perPage: z.number().optional(),
      nextPageLink: aircallUrl().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.calls.list(auth, {
      from: input.from,
      per_page: input.perPage,
      next_page_link: input.nextPageLink,
    });

    return {
      calls: result.data.calls.map(transformCall),
      $native: result.$native,
    };
  },
);

import { transformPerson } from '@/platforms/salesloft/actions/mappers';
import { client } from '@/platforms/salesloft/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'list-people',
  {
    operation: 'list',
    resource: 'people',
    mutation: true,
    schema: z.object({
      perPage: z.number().optional(),
      page: z.number().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.people.list(auth, {
      per_page: input.perPage,
      page: input.page,
    });

    return {
      data: result.data.data.map(transformPerson),
      $native: result.$native,
    };
  },
);

import { transformPerson } from '@/platforms/salesloft/actions/mappers';
import { client } from '@/platforms/salesloft/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'find-people',
  {
    operation: 'find',
    resource: 'people',
    mutation: true,
    schema: z.object({
      id: z.string(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.people.find(auth, input);

    return {
      data: transformPerson(result.data.data),
      $native: result.$native,
    };
  },
);

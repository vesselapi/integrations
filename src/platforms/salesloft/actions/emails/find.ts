import { transformEmail } from '@/platforms/salesloft/actions/mappers';
import { client } from '@/platforms/salesloft/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'find-email',
  {
    operation: 'find',
    resource: 'emails',
    mutation: true,
    schema: z.object({
      id: z.string(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.emails.find(auth, input);

    return {
      data: transformEmail(result.data.data),
      $native: result.$native,
    };
  },
);

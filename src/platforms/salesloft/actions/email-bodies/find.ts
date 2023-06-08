import { transformEmailBody } from '@/platforms/salesloft/actions/mappers';
import { client } from '@/platforms/salesloft/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'find-email-body',
  {
    operation: 'find',
    resource: 'email-bodies',
    mutation: true,
    schema: z.object({
      id: z.string(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.emailBodies.find(auth, input);

    return {
      data: transformEmailBody(result.data.data),
      $native: result.$native,
    };
  },
);

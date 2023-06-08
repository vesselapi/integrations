import { transformCall } from '@/platforms/dialpad/actions/mappers';
import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

export default action(
  'find-call',
  {
    operation: 'find',
    resource: 'calls',
    mutation: false,
    schema: z.object({
      id: z.string(),
    }),
    scopes: [],
  },
  async ({ auth, input }) => {
    const result = await client.calls.find(auth, {
      id: input.id,
    });

    return {
      ...transformCall(result.data),
      $native: result.$native,
    };
  },
);

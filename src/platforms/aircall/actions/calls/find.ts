import { transformCall } from '@/platforms/aircall/actions/mappers';
import { z } from 'zod';
import { action } from '../../../../sdk';
import { client } from '../../client';

export default action(
  'find-call',
  {
    operation: 'find',
    resource: 'calls',
    mutation: false,
    schema: z.object({
      id: z.number().or(z.string()),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.calls.find(auth, { id: input.id });

    return {
      contact: transformCall(result.data.call),
      $native: result.$native,
    };
  },
);

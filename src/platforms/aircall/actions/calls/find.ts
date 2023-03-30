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
      id: z.number(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.calls.find(auth, { id: input.id });
  },
);

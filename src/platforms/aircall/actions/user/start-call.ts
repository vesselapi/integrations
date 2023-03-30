import { z } from 'zod';
import { action } from '../../../../sdk';
import { client } from '../../client';

export default action(
  'start-user-call',
  {
    operation: 'startCall',
    resource: 'users',
    mutation: false,
    schema: z.object({
      id: z.string(),
      number_id: z.number(),
      to: z.string(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.users.startCall(auth, {
      id: input.id,
      number_id: input.number_id,
      to: input.to,
    });
  },
);

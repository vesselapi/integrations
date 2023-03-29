import { z } from 'zod';
import { action } from '../../../../sdk';
import client from '../../client';

export default action(
  'users-call-start',
  {
    resource: 'users',
    mutation: false,
    schema: z.object({
      id: z.string(),
      number_id: z.number(),
      to: z.string(),
    }),
    scopes: [],
  },
  async ({ input, auth }): Promise<{}> => {
    return await client.request(
      {
        path: `users/${input.id}/calls`,
        method: 'POST',
        body: {
          number_id: input.number_id,
          to: input.to,
        },
      },
      auth,
    );
  },
);

import { z } from 'zod';
import { action } from '../../../../sdk';
import client from '../../client';
import { AircallUser } from '../../types';

export default action(
  'users-find',
  {
    resource: 'user',
    mutation: false,
    schema: z.object({
      id: z.string(),
    }),
    scopes: [],
  },
  async ({ input, auth }): Promise<AircallUser> => {
    return await client.request(
      {
        path: `users/${input.id}`,
        method: 'GET',
      },
      auth,
    );
  },
);

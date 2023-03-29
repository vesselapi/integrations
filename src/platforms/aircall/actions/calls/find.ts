import { z } from 'zod';
import { action } from '../../../../sdk';
import client from '../../client';
import { AircallCall } from '../../types';

export default action(
  'calls-find',
  {
    resource: 'calls',
    mutation: false,
    schema: z.object({
      id: z.string(),
      fetch_contact: z.string().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }): Promise<{ contact: AircallCall }> => {
    return await client.request(
      {
        path: `calls/${input.id}`,
        method: 'GET',
      },
      auth,
    );
  },
);

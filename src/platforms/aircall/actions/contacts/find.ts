import { z } from 'zod';
import { action } from '../../../../sdk';
import client from '../../client';
import { AircallContact } from '../../types';

export default action(
  'contacts-find',
  {
    resource: 'contact',
    mutation: false,
    schema: z.object({
      id: z.string(),
    }),
    scopes: [],
  },
  async ({ input, auth }): Promise<{ contact: AircallContact }> => {
    return await client.request(
      {
        path: `contacts/${input.id}`,
        method: 'GET',
      },
      auth,
    );
  },
);

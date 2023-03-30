import { z } from 'zod';
import { action } from '../../../../sdk';
import { client } from '../../client';

export default action(
  'contacts-find',
  {
    resource: 'contact',
    mutation: false,
    schema: z.object({
      id: z.number(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.contacts.find(auth, { id: input.id });
  },
);

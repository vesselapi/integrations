import { z } from 'zod';
import { action } from '../../../../sdk';
import client from '../../client';

export default action(
  'contacts-find',
  {
    resource: 'user',
    mutation: false,
    schema: z.object({
      id: z.string(),
    }),
    scopes: [],
  },
  ({ auth, input }) => client.contacts.find(auth, input),
);

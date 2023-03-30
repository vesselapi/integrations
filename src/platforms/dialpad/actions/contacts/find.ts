import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

export default action(
  'find-contacts',
  {
    operation: 'find',
    resource: 'contacts',
    mutation: false,
    schema: z.object({
      id: z.string(),
    }),
    scopes: [],
  },
  ({ auth, input }) =>
    client.contacts.find(auth, {
      id: input.id,
    }),
);

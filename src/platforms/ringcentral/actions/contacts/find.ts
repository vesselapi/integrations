import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

export default action(
  'find-contact',
  {
    operation: 'find',
    resource: 'contacts',
    mutation: false,
    schema: z.object({
      id: z.string(),
    }),
    scopes: ['ReadContacts'],
  },
  ({ auth, input }) => client.contacts.find(auth, input),
);

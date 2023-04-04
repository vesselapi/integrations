import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';
import client from '../../client';

export default action(
  'find-contact',
  {
    operation: 'find',
    resource: 'contacts',
    mutation: false,
    schema: custom.object({
      id: z.string(),
    }),
    scopes: ['ReadContacts'],
  },
  ({ auth, input }) => client.contacts.find(auth, input),
);

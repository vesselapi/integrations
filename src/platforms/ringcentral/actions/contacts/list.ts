import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';
import client from '../../client';

export default action(
  'list-contacts',
  {
    operation: 'list',
    resource: 'contacts',
    mutation: false,
    schema: custom.object({
      page: z.number().optional(),
      perPage: z.number().optional(),
    }),
    scopes: ['ReadContacts'],
  },
  ({ auth, input }) => client.contacts.list(auth, input),
);

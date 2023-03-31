import { action } from '@/sdk';
import client from '../../client';
import { ringcentralContactCreateSchema } from '../../schemas';

export default action(
  'create-contact',
  {
    operation: 'create',
    resource: 'contacts',
    mutation: true,
    schema: ringcentralContactCreateSchema,
    scopes: ['Contacts'],
  },
  ({ auth, input }) => client.contacts.create(auth, input),
);

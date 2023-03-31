import { action } from '@/sdk';
import client from '../../client';
import { ringcentralContactUpdateSchema } from '../../schemas';

export default action(
  'update-contact',
  {
    operation: 'update',
    resource: 'contacts',
    mutation: true,
    schema: ringcentralContactUpdateSchema,
    scopes: ['Contacts'],
  },
  ({ auth, input }) => client.contacts.update(auth, input),
);

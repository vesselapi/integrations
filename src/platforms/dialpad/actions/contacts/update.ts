import { action } from '../../../../sdk';
import client from '../../client';
import { dialpadContactUpdateSchema } from '../../schemas';

export default action(
  'contacts-update',
  {
    operation: 'update',
    resource: 'contacts',
    mutation: true,
    schema: dialpadContactUpdateSchema,
    scopes: [],
  },
  ({ auth, input }) => client.contacts.update(auth, input),
);

import { action } from '../../../../sdk';
import client from '../../client';
import { dialpadContactCreateSchema } from '../../schemas';

export default action(
  'contacts-create',
  {
    operation: 'create',
    resource: 'contacts',
    mutation: true,
    schema: dialpadContactCreateSchema,
    scopes: [],
  },
  ({ auth, input }) => client.contacts.create(auth, input),
);

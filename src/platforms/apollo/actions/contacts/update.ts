import { client } from '@/platforms/apollo/client';
import { apolloContactUpdate } from '@/platforms/apollo/schemas';
import { action } from '@/sdk';

export default action(
  'update-contact',
  {
    operation: 'update',
    resource: 'contacts',
    mutation: true,
    schema: apolloContactUpdate,
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.contacts.update(auth, input);
  },
);

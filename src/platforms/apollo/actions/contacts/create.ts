import { client } from '@/platforms/apollo/client';
import { apolloContactCreate } from '@/platforms/apollo/schemas';
import { action } from '@/sdk';

export default action(
  'create-contact',
  {
    operation: 'create',
    resource: 'contacts',
    mutation: true,
    schema: apolloContactCreate,
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.contacts.create(auth, input);
  },
);

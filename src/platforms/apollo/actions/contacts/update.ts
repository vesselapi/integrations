import { transformContact } from '@/platforms/apollo/actions/mappers';
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
    const result = await client.contacts.update(auth, input);

    return {
      contact: transformContact(result.data.contact),
      $native: result.$native,
    };
  },
);

import { client } from '@/platforms/active-campaign/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';

export default action(
  'list-contacts',
  {
    operation: 'list',
    resource: 'contacts',
    mutation: false,
    schema: custom.object({}),
    scopes: [],
  },
  async ({ auth }) => {
    return await client.contacts.list(auth, {});
  },
);

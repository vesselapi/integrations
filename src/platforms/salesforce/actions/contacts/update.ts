import { client } from '@/platforms/salesforce/client';
import { action } from '@/sdk';
import { salesforceContactUpdate } from '../../schemas';

export default action(
  'update-contact',
  {
    operation: 'update',
    resource: 'contacts',
    mutation: true,
    schema: salesforceContactUpdate,
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.contacts.update(auth, input);
  },
);

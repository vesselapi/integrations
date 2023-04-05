import { client } from '@/platforms/salesforce/client';
import { action } from '@/sdk';
import { salesforceContactCreateInput } from '../../schemas';

export default action(
  'create-contact',
  {
    operation: 'create',
    resource: 'contacts',
    mutation: true,
    schema: salesforceContactCreateInput,
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.contacts.create(auth, input);
  },
);

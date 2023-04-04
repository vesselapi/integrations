import { client } from '@/platforms/salesforce/client';
import { action } from '@/sdk';
import { salesforceContactCreate } from '../../schemas';

export default action(
  'create-contact',
  {
    operation: 'create',
    resource: 'contacts',
    mutation: true,
    schema: salesforceContactCreate,
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.contacts.create(auth, input);
  },
);

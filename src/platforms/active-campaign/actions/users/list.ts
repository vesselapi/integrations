import { client } from '@/platforms/active-campaign/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';

export default action(
  'list-users',
  {
    operation: 'list',
    resource: 'users',
    mutation: false,
    schema: custom.object({}),
    scopes: [],
  },
  async ({ auth }) => {
    return await client.users.list(auth, {});
  },
);

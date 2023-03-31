import { action } from '../../../../sdk';
import { client } from '../../client';
import { apolloAccountUpdate } from '../../schemas';

export default action(
  'update-account',
  {
    operation: 'update',
    resource: 'accounts',
    mutation: true,
    schema: apolloAccountUpdate,
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.accounts.update(auth, {
      id: input.id,
      name: input.name,
      domain: input.domain,
      phone: input.phone,
    });
  },
);

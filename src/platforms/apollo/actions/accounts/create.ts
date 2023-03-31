import { action } from '../../../../sdk';
import { client } from '../../client';
import { apolloAccountCreate } from '../../schemas';

export default action(
  'create-account',
  {
    operation: 'create',
    resource: 'accounts',
    mutation: true,
    schema: apolloAccountCreate,
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.accounts.create(auth, {
      name: input.name,
      domain: input.domain,
      phone: input.phone,
    });
  },
);

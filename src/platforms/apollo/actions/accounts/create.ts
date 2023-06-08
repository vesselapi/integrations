import { transformAccount } from '@/platforms/apollo/actions/mappers';
import { client } from '@/platforms/apollo/client';
import { apolloAccountCreate } from '@/platforms/apollo/schemas';
import { action } from '@/sdk';

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
    const result = await client.accounts.create(auth, input);

    return {
      account: transformAccount(result.data.account),
      $native: result.$native,
    };
  },
);

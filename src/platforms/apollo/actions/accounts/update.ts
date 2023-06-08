import { transformAccount } from '@/platforms/apollo/actions/mappers';
import { client } from '@/platforms/apollo/client';
import { apolloAccountUpdate } from '@/platforms/apollo/schemas';
import { action } from '@/sdk';

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
    const result = await client.accounts.update(auth, input);

    return {
      account: transformAccount(result.data.account),
      $native: result.$native,
    };
  },
);

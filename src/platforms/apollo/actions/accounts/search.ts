import { transformAccount } from '@/platforms/apollo/actions/mappers';
import { client } from '@/platforms/apollo/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'search-account',
  {
    operation: 'search',
    resource: 'accounts',
    mutation: false,
    schema: z.object({
      qOrganizationName: z.string().optional(),
      page: z.number().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.accounts.search(auth, {
      q_organization_name: input.qOrganizationName,
      page: input.page,
    });

    return {
      accounts: result.data.accounts.map(transformAccount),
      $native: result.$native,
    };
  },
);

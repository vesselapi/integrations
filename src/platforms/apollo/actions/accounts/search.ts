import { client } from '@/platforms/apollo/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';

export default action(
  'search-account',
  {
    operation: 'search',
    resource: 'accounts',
    mutation: true,
    schema: custom.object({
      q_organization_name: z.string().optional(),
      page: z.number().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.accounts.search(auth, input);
  },
);

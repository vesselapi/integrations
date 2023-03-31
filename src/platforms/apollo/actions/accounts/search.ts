import { client } from '@/platforms/apollo/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'list-account',
  {
    operation: 'list',
    resource: 'accounts',
    mutation: true,
    schema: z.object({
      q_organization_name: z.string().optional(),
      page: z.number().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.accounts.search(auth, input);
  },
);

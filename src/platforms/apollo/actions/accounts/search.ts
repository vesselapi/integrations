import { z } from 'zod';
import { action } from '../../../../sdk';
import { client } from '../../client';

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
    return await client.accounts.search(auth, {
      page: input.page,
      q_organization_name: input.q_organization_name,
    });
  },
);

import { z } from 'zod';
import { action } from '../../../../sdk';
import { client } from '../../client';

export default action(
  'list-email-accounts',
  {
    operation: 'list',
    resource: 'email-accounts',
    mutation: true,
    schema: z.object({
      page: z.number().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.emailAccounts.list(auth, {
      page: input.page,
    });
  },
);

import { client } from '@/platforms/apollo/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';

export default action(
  'list-email-accounts',
  {
    operation: 'list',
    resource: 'email-accounts',
    mutation: true,
    schema: custom.object({
      page: z.number().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.emailAccounts.list(auth, input);
  },
);

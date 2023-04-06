import { client } from '@/platforms/apollo/client';
import { action } from '@/sdk';
import { z } from 'zod';

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
    const result = await client.emailAccounts.list(auth, input);

    return {
      emailAccounts: result.data.email_accounts.map((emailAccount) => ({
        id: emailAccount.id,
        default: emailAccount.default,
        email: emailAccount.email,
        userId: emailAccount.user_id,
      })),
      $native: result.$native,
    };
  },
);

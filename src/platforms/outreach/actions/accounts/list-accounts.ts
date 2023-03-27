import { outreachUrl } from '@/platforms/outreach/actions/validators';
import { client } from '@/platforms/outreach/client';
import { action, ActionClientError } from '@/sdk';
import { z } from 'zod';

export default action(
  'list-accounts',
  {
    resource: 'accounts',
    mutation: false,
    schema: z.object({
      filters: z
        .object({
          name: z.string().optional(),
          domain: z.string().optional(),
        })
        .optional(),
      cursor: outreachUrl().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.accounts.list(auth, {
      cursor: input.cursor,
      filters: input.filters,
    });

    if (result.error) {
      throw ActionClientError.fromClientResult(result.error);
    }

    return result.data;
  },
);

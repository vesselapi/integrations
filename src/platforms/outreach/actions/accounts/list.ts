import { outreachUrl } from '@/platforms/outreach/actions/validators';
import { client } from '@/platforms/outreach/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';

export default action(
  'list-accounts',
  {
    operation: 'list',
    resource: 'accounts',
    mutation: false,
    schema: custom.object({
      filters: custom
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
    return await client.accounts.list(auth, {
      cursor: input.cursor,
      filters: input.filters,
    });
  },
);

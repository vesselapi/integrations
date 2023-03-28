import { outreachUrl } from '@/platforms/outreach/actions/validators';
import { client } from '@/platforms/outreach/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'list-prospects',
  {
    resource: 'prospects',
    mutation: false,
    schema: z.object({
      filters: z
        .object({
          emails: z.string(),
        })
        .optional(),
      cursor: outreachUrl().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.prospects.list(auth, {
      cursor: input.cursor,
      filters: input.filters,
    });
  },
);

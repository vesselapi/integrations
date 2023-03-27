import { outreachUrl } from '@/platforms/outreach/actions/validators';
import { client } from '@/platforms/outreach/client';
import { action, ActionClientError } from '@/sdk';
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
    const result = await client.prospects.list(auth, {
      cursor: input.cursor,
      filters: input.filters,
    });

    if (result.error) {
      throw ActionClientError.fromClientResult(result.error);
    }

    return result.data;
  },
);

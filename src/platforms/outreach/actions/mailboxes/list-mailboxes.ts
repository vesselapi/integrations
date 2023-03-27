import { outreachUrl } from '@/platforms/outreach/actions/validators';
import { client } from '@/platforms/outreach/client';
import { action, ActionClientError } from '@/sdk';
import { z } from 'zod';

export default action(
  'list-mailboxes',
  {
    resource: 'mailboxes',
    mutation: false,
    schema: z.object({
      cursor: outreachUrl().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.mailboxes.list(auth, {
      cursor: input.cursor,
    });

    if (result.error) {
      throw ActionClientError.fromClientResult(result.error);
    }

    return result.data;
  },
);

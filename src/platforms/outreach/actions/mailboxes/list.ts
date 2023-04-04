import { outreachUrl } from '@/platforms/outreach/actions/validators';
import { client } from '@/platforms/outreach/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';

export default action(
  'list-mailboxes',
  {
    operation: 'list',
    resource: 'mailboxes',
    mutation: false,
    schema: custom.object({
      cursor: outreachUrl().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.mailboxes.list(auth, {
      cursor: input.cursor,
    });
  },
);

// import { outreachUrl } from '@/platforms/outreach/actions/validators';
import { client } from '@/platforms/slack/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'list-conversations',
  {
    operation: 'list',
    resource: 'conversations',
    mutation: true,
    schema: z.object({
      cursor: z.string().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.conversations.list(auth, {
      cursor: input.cursor,
    });
  },
);

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
    const result = await client.conversations.list(auth, {
      cursor: input.cursor,
    });

    return {
      channels: result.data.channels,
      responseMetadata: {
        nextCursor: result.data.response_metadata.next_cursor,
      },
      $native: result.$native,
    };
  },
);

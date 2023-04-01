import { client } from '@/platforms/slack/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'create-chat',
  {
    operation: 'create',
    resource: 'chats',
    mutation: false,
    schema: z.object({
      text: z.string(),
      channel: z.string(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.chat.postMessage(auth, input);
  },
);

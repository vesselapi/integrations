import { client } from '@/platforms/slack/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'create-message',
  {
    operation: 'create',
    resource: 'messages',
    mutation: true,
    schema: z.object({
      text: z.string(),
      channel: z.string(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.messages.create(auth, input);
  },
);

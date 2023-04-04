import { client } from '@/platforms/slack/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';

export default action(
  'update-message',
  {
    operation: 'update',
    resource: 'messages',
    mutation: false,
    schema: custom.object({
      ts: z.string(),
      text: z.string(),
      channel: z.string(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.messages.update(auth, input);
  },
);

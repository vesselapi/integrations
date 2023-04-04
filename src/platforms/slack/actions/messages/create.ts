import { client } from '@/platforms/slack/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';

export default action(
  'create-messages',
  {
    operation: 'create',
    resource: 'messages',
    mutation: false,
    schema: custom.object({
      text: z.string(),
      channel: z.string(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.messages.create(auth, input);
  },
);

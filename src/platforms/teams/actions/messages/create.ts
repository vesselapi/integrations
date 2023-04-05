import { client } from '@/platforms/microsoft/client';
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
      channelId: z.string(),
      teamId: z.string(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.teams.messages.create(auth, input);
  },
);

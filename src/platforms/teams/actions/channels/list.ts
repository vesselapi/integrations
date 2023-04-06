import { client } from '@/platforms/microsoft/client';
import * as microsoft from '@/platforms/microsoft/validators';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'list-channels',
  {
    operation: 'list',
    resource: 'channels',
    mutation: false,
    schema: z.object({
      teamId: z.string(),
      cursor: microsoft.microsoftUrl().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.teams.channels.list(auth, input);
  },
);

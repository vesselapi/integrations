import { client } from '@/platforms/salesloft/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';

export default action(
  'find-email',
  {
    operation: 'find',
    resource: 'emails',
    mutation: true,
    schema: custom.object({
      id: z.string(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.emails.find(auth, input);
  },
);

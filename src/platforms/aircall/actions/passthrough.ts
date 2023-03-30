import { client } from '@/platforms/aircall/client';
import { action } from '@/sdk';
import { z } from 'zod';
import { aircallUrl } from './validators';

export default action(
  'passthrough',
  {
    mutation: true,
    schema: z.object({
      url: aircallUrl().or(
        z
          .string()
          .refine((s) => s.startsWith('/'))
          .transform((s) => s as `/${string}`),
      ),
      method: z.enum(['get', 'post', 'put', 'delete', 'patch']),
      query: z.record(z.string()).optional(),
      body: z.record(z.unknown()).optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.passthrough(auth, { ...input });
  },
);

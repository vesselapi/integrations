import { outreachUrl } from '@/platforms/outreach/actions/validators';
import { client } from '@/platforms/outreach/client';
import { action, ActionClientError } from '@/sdk';
import { z } from 'zod';

export default action(
  'passthrough',
  {
    mutation: true,
    schema: z.object({
      url: outreachUrl().or(
        z
          .string()
          .refine((s) => s.startsWith('/'))
          .transform((s) => s as `/${string}`),
      ),
      method: z.enum(['get', 'post', 'delete', 'patch']),
      query: z.record(z.string()).optional(),
      body: z.record(z.unknown()).optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.passthrough(auth, { ...input });

    if (result.error) {
      throw ActionClientError.fromClientResult(result.error);
    }

    return result.data;
  },
);

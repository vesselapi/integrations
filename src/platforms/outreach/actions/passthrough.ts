import { outreachUrl } from '@/platforms/outreach/actions/validators';
import { client } from '@/platforms/outreach/client';
import { action, ActionClientError } from '@/sdk';
import { z } from 'zod';

export default action(
  'passthrough',
  {
    mutation: true,
    schema: z.object({
      url: outreachUrl(),
      method: z.enum(['get', 'post', 'delete', 'patch']),
      query: z.record(z.string()),
      body: z.record(z.unknown()),
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

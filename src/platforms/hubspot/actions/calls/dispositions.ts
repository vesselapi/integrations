import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

export default action(
  'calls-dispositions',
  {
    operation: 'dispositions',
    resource: 'calls',
    mutation: false,
    schema: z.object({}),
    scopes: [],
  },
  async ({ auth }) => {
    const result = await client.calls.dispositions(auth, {});
    return {
      result: {
        dispositions: result.data.map((disposition) => ({
          id: disposition.id,
          label: disposition.label,
        })),
      },
      $native: result.$native,
    };
  },
);

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
  async ({ auth, input }) => {
    const result: { data: { label: string; id: string }[]; $native: any } =
      await client.passthrough(auth, {
        url: `/calling/v1/dispositions`,
        method: 'GET',
      });

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

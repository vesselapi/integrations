import { transformDisposition } from '@/platforms/apollo/actions/mappers';
import { client } from '@/platforms/apollo/client';
import { action } from '@/sdk';
import { random } from 'radash';
import { z } from 'zod';

export default action(
  'calls-dispositions',
  {
    operation: 'dispositions-list',
    resource: 'calls',
    mutation: false,
    schema: z.object({}),
    scopes: [],
  },
  async ({ auth }) => {
    const result = await client.calls.additionalBootstrappedData(auth, {
      // Generate a new cache key to force a cache miss.
      cacheKey: random(0, 1e12),
    });

    return {
      dispositions:
        result.data.bootstrapped_data.phone_call_outcomes?.map(
          transformDisposition,
        ) ?? [],
      $native: result.$native,
    };
  },
);

import {
  transformCadence,
  transformMetadata,
} from '@/platforms/salesloft/actions/mappers';
import { client } from '@/platforms/salesloft/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'list-cadences',
  {
    operation: 'list',
    resource: 'cadences',
    mutation: true,
    schema: z.object({
      perPage: z.number().optional(),
      page: z.number().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.cadences.list(auth, {
      per_page: input.perPage,
      page: input.page,
    });

    return {
      data: {
        data: result.data.data.map(transformCadence),
        metadata: transformMetadata(result.data.metadata),
      },
      $native: result.$native,
    };
  },
);

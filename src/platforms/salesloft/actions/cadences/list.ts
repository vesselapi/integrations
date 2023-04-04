import { client } from '@/platforms/salesloft/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';

export default action(
  'list-cadences',
  {
    operation: 'list',
    resource: 'cadences',
    mutation: true,
    schema: custom.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.cadences.list(auth, input);
  },
);

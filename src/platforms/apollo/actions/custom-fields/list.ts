import { client } from '@/platforms/apollo/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';

export default action(
  'list-custom-fields',
  {
    operation: 'list',
    resource: 'custom-fields',
    mutation: true,
    schema: custom.object({
      page: z.number().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.customFields.list(auth, input);
  },
);

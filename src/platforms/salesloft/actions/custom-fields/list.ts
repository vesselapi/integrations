import { client } from '@/platforms/salesloft/client';
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
      per_page: z.number().optional(),
      page: z.number().optional(),
      field_type: z.string().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.customFields.list(auth, input);
  },
);

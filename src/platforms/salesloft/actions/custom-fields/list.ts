import { client } from '@/platforms/salesloft/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'list-custom-fields',
  {
    operation: 'list',
    resource: 'custom-fields',
    mutation: true,
    schema: z.object({
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
import { client } from '@/platforms/salesloft/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'create-custom-field',
  {
    operation: 'create',
    resource: 'custom-fields',
    mutation: true,
    schema: z.object({
      name: z.string(),
      field_type: z.string(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.customFields.create(auth, input);
  },
);

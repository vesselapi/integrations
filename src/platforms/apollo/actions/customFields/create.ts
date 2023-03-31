import { client } from '@/platforms/apollo/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'create-custom-fields',
  {
    operation: 'create',
    resource: 'custom-fields',
    mutation: true,
    schema: z.object({
      modality: z.enum(['contact', 'account']),
      name: z.string(),
      type: z.string(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.customFields.create(auth, input);
  },
);

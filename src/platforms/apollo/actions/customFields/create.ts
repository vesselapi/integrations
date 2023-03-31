import { z } from 'zod';
import { action } from '../../../../sdk';
import { client } from '../../client';

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
    return await client.customFields.create(auth, {
      modality: input.modality,
      name: input.name,
      type: input.type,
    });
  },
);

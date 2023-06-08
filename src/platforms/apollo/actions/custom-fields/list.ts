import { client } from '@/platforms/apollo/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'list-custom-fields',
  {
    operation: 'list',
    resource: 'custom-fields',
    mutation: false,
    schema: z.object({
      page: z.number().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.customFields.list(auth, input);

    return {
      typedCustomFields: result.data.typed_custom_fields,
      $native: result.$native,
    };
  },
);

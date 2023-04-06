import { transformCustomField } from '@/platforms/salesloft/actions/mappers';
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
      fieldType: z.string(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.customFields.create(auth, {
      name: input.name,
      field_type: input.fieldType,
    });

    return {
      data: transformCustomField(result.data.data),
      $native: result.$native,
    };
  },
);

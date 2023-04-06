import { transformCustomField } from '@/platforms/salesloft/actions/mappers';
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
      perPage: z.number().optional(),
      page: z.number().optional(),
      fieldType: z.string().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.customFields.list(auth, {
      per_page: input.perPage,
      page: input.page,
      field_type: input.fieldType,
    });

    return {
      data: result.data.data.map(transformCustomField),
      $native: result.$native,
    };
  },
);

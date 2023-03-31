import { z } from 'zod';
import { action } from '../../../../sdk';
import { client } from '../../client';

export default action(
  'list-custom-fields',
  {
    operation: 'list',
    resource: 'custom-fields',
    mutation: true,
    schema: z.object({
      page: z.number().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.customFields.search(auth, {
      page: input.page,
    });
  },
);

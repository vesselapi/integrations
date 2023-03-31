import { z } from 'zod';
import { action } from '../../../../sdk';
import { client } from '../../client';

export default action(
  'list-activities',
  {
    operation: 'list',
    resource: 'activities',
    mutation: true,
    schema: z.object({
      contact_id: z.string().optional(),
      types: z.array(z.string()).optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.activities.list(auth, {
      contact_id: input.contact_id,
      types: input.types,
    });
  },
);

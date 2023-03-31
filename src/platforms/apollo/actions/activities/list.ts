import { client } from '@/platforms/apollo/client';
import { action } from '@/sdk';
import { z } from 'zod';

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
    return await client.activities.list(auth, input);
  },
);

import { transformEmailActivity } from '@/platforms/apollo/actions/mappers';
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
      contactId: z.string().optional(),
      types: z.array(z.string()).optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.activities.list(auth, {
      contact_id: input.contactId,
      types: input.types,
    });

    return {
      activities: result.data.activities.map(transformEmailActivity),
      $native: result.$native,
    };
  },
);

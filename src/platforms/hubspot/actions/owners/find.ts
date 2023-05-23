import { transformOwner } from '@/platforms/hubspot/actions/mappers';
import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

export default action(
  'find-owner',
  {
    operation: 'find',
    resource: 'owners',
    mutation: false,
    schema: z.object({
      id: z.string(),
    }),
    scopes: ['crm.objects.owners.read'],
  },
  async ({ auth, input }) => {
    const result = await client.owners.find(auth, {
      id: input.id,
    });

    return {
      ...transformOwner(result.data),
      $native: result.$native,
    };
  },
);

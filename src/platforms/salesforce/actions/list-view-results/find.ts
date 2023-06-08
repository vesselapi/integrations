import { client } from '@/platforms/salesforce/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'find-list-view-results',
  {
    operation: 'find',
    resource: 'list-view-results',
    mutation: false,
    schema: z.object({
      id: z.string(),
      objectType: z.string(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.listViewResults.find(auth, {
      Id: input.id,
      objectType: input.objectType,
    });
  },
);

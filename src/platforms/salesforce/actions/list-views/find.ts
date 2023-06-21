import { transformListView } from '@/platforms/salesforce/actions/mappers';
import { client } from '@/platforms/salesforce/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'find-list-view',
  {
    operation: 'find',
    resource: 'list-views',
    mutation: false,
    schema: z.object({
      id: z.string(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.listViews.find(auth, {
      Id: input.id,
    });

    return {
      ...transformListView(result.data),
      $native: result.$native,
    };
  },
);

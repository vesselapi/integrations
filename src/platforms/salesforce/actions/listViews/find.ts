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
      Id: z.string(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.listViews.find(auth, { Id: input.Id });
  },
);

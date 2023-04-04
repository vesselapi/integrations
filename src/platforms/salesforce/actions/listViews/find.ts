import { client } from '@/platforms/salesforce/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';

export default action(
  'find-list-view',
  {
    operation: 'find',
    resource: 'list-views',
    mutation: false,
    schema: custom.object({
      Id: z.number(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.listViews.find(auth, { Id: input.Id });
  },
);

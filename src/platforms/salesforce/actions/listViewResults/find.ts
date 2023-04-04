import { client } from '@/platforms/salesforce/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';

export default action(
  'find-list-view-results',
  {
    operation: 'find',
    resource: 'list-view-results',
    mutation: false,
    schema: custom.object({
      Id: z.number(),
      objectType: z.string(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.listViewResults.find(auth, {
      Id: input.Id,
      objectType: input.objectType,
    });
  },
);

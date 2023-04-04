import { client } from '@/platforms/apollo/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';

export default action(
  'search-emails',
  {
    operation: 'search',
    resource: 'emails',
    mutation: true,
    schema: custom.object({
      page: z.number().optional(),
      emailer_campaign_id: z.string().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.emails.search(auth, input);
  },
);

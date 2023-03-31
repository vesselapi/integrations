import { z } from 'zod';
import { action } from '../../../../sdk';
import { client } from '../../client';

export default action(
  'search-emails',
  {
    operation: 'search',
    resource: 'emails',
    mutation: true,
    schema: z.object({
      page: z.number().optional(),
      emailer_campaign_id: z.string().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.emails.search(auth, {
      page: input.page,
      emailer_campaign_id: input.emailer_campaign_id,
    });
  },
);

import { transformEmailMessage } from '@/platforms/apollo/actions/mappers';
import { client } from '@/platforms/apollo/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'search-emails',
  {
    operation: 'search',
    resource: 'emails',
    mutation: true,
    schema: z.object({
      page: z.number().optional(),
      emailerCampaignId: z.string().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.emails.search(auth, {
      emailer_campaign_id: input.emailerCampaignId,
    });

    return {
      emailerMessages: result.data.emailer_messages.map(transformEmailMessage),
      $native: result.$native,
    };
  },
);

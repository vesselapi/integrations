import { client } from '@/platforms/apollo/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'are-contacts-deployable',
  {
    operation: 'check-deployability',
    resource: 'contacts',
    mutation: false,
    schema: z.object({
      contactIds: z.array(z.string()),
      emailerCampaignId: z.string(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.contacts.isDeployable(auth, {
      contact_ids: input.contactIds,
      emailer_campaign_id: input.emailerCampaignId,
    });

    return {
      ...result.data,
      $native: result.$native,
    };
  },
);

import {
  transformContact,
  transformSequence,
} from '@/platforms/apollo/actions/mappers';
import { client } from '@/platforms/apollo/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'start-sequences',
  {
    operation: 'start',
    resource: 'sequences',
    mutation: true,
    schema: z.object({
      emailerCampaignId: z.string(),
      contactIds: z.array(z.string()),
      sendEmailFromEmailAccountId: z.string().optional(),
      alwaysSequence: z.boolean().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.sequences.start(auth, {
      emailer_campaign_id: input.emailerCampaignId,
      contact_ids: input.contactIds,
      send_email_from_email_account_id: input.sendEmailFromEmailAccountId,
      always_sequence: input.alwaysSequence,
    });

    return {
      contacts: result.data.contacts.map(transformContact),
      emailerCampaign: transformSequence(result.data.emailer_campaign),
      $native: result.$native,
    };
  },
);

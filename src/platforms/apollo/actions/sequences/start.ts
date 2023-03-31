import { z } from 'zod';
import { action } from '../../../../sdk';
import { client } from '../../client';

export default action(
  'start-sequences',
  {
    operation: 'start',
    resource: 'sequences',
    mutation: true,
    schema: z.object({
      emailer_campaign_id: z.string(),
      contact_ids: z.array(z.string()),
      send_email_from_email_account_id: z.string().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.sequences.addContacts(auth, {
      emailer_campaign_id: input.emailer_campaign_id,
      contact_ids: input.contact_ids,
      send_email_from_email_account_id: input.send_email_from_email_account_id,
    });
  },
);

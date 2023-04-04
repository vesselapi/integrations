import { client } from '@/platforms/apollo/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';

export default action(
  'start-sequences',
  {
    operation: 'start',
    resource: 'sequences',
    mutation: true,
    schema: custom.object({
      emailer_campaign_id: z.string(),
      contact_ids: z.array(z.string()),
      send_email_from_email_account_id: z.string().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.sequences.start(auth, input);
  },
);

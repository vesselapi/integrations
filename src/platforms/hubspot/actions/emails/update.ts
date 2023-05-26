import { transformEmail } from '@/platforms/hubspot/actions/mappers';
import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';
import { hubspotEmailDirectionSchema } from '../../schemas';

export default action(
  'emails-update',
  {
    operation: 'update',
    resource: 'emails',
    mutation: true,
    schema: z
      .object({
        hsEmailDirection: hubspotEmailDirectionSchema,
        hsEmailStatus: z.string(),
        hubspotOwnerId: z.string(),
      })
      .partial()
      .extend({
        id: z.string(),
      }),
    scopes: [],
  },
  async ({ auth, input }) => {
    const result = await client.emails.update(auth, {
      id: input.id,
      hs_email_direction: input.hsEmailDirection,
      hs_email_status: input.hsEmailStatus,
      hubspot_owner_id: input.hubspotOwnerId,
    });

    return {
      ...transformEmail(result.data),
      $native: result.$native,
    };
  },
);

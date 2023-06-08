import { transformCall } from '@/platforms/hubspot/actions/mappers';
import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

export default action(
  'calls-update',
  {
    operation: 'update',
    resource: 'calls',
    mutation: true,
    schema: z
      .object({
        hsCallDisposition: z.string(),
        hubspotOwnerId: z.string(),
      })
      .partial()
      .extend({
        id: z.string(),
      }),
    scopes: [],
  },
  async ({ auth, input }) => {
    const result = await client.calls.update(auth, {
      id: input.id,
      hs_call_disposition: input.hsCallDisposition,
      hubspot_owner_id: input.hubspotOwnerId,
    });

    return {
      ...transformCall(result.data),
      $native: result.$native,
    };
  },
);

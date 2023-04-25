import { transformCall } from '@/platforms/hubspot/actions/mappers';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';
import client from '../../client';

export default action(
  'calls-create',
  {
    operation: 'create',
    resource: 'calls',
    mutation: true,
    schema: z
      .object({
        hsCallDisposition: z.string(),
        hsCallDirection: z.enum(['INBOUND', 'OUTBOUND']),
        hsCallBody: z.string(),
        hsCallTitle: z.string(),
        hubspotOwnerId: z.string(),
      })
      .partial()
      .extend({
        hsTimestamp: custom.date(),
      }),
    scopes: [],
  },
  async ({ auth, input }) => {
    const result = await client.calls.create(auth, {
      hs_call_disposition: input.hsCallDisposition,
      hs_call_direction: input.hsCallDirection,
      hs_timestamp: input.hsTimestamp,
      hs_call_body: input.hsCallBody,
      hs_call_title: input.hsCallTitle,
      hubspot_owner_id: input.hubspotOwnerId,
    });

    return {
      ...transformCall(result.data),
      $native: result.$native,
    };
  },
);

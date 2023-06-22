import { transformCall } from '@/platforms/apollo/actions/mappers';
import { client } from '@/platforms/apollo/client';
import { action } from '@/sdk';
import { random } from 'radash';
import { z } from 'zod';

export default action(
  'create-call',
  {
    operation: 'create',
    resource: 'calls',
    mutation: true,
    schema: z.object({
      dispositionId: z.string(),
      contactId: z.string(),
      purposeId: z.string().nullish(),
      note: z.string().nullish(),
      markComplete: z.boolean().nullish(),
      fromNumber: z.string().nullish(),
      toNumber: z.string().nullish(),
      durationSeconds: z.number().nullish(),
      inbound: z.boolean().nullish(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.calls.create(auth, {
      contact_id: input.contactId,
      note: input.note,
      mark_all_sequences_as_finished: input.markComplete,
      phone_call_outcome_id: input.dispositionId,
      phone_call_purpose_id: input.purposeId,
      from_number: input.fromNumber,
      duration: input.durationSeconds,
      to_number: input.toNumber,
      inbound: input.inbound,
      // Generate a new cache key to force a cache miss.
      cacheKey: random(0, 1e12),
    });

    return {
      call: transformCall(result.data.phone_call),
      $native: result.$native,
    };
  },
);

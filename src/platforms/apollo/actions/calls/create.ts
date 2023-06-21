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
      phoneCallOutcomeId: z.string(),
      contactId: z.string(),
      note: z.string().nullish(),
      phoneCallPurposeId: z.string().nullish(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.calls.create(auth, {
      contact_id: input.contactId,
      note: input.note,
      mark_all_sequences_as_finished: true,
      phone_call_outcome_id: input.phoneCallOutcomeId,
      phone_call_purpose_id: input.phoneCallPurposeId,
      // Generate a new cache key to force a cache miss.
      cacheKey: random(0, 1e12),
    });

    return {
      call: transformCall(result.data.phone_call),
      $native: result.$native,
    };
  },
);

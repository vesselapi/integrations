import { client } from '@/platforms/apollo/client';
import { apolloCreateSequenceStep } from '@/platforms/apollo/schemas';
import { action } from '@/sdk';

export default action(
  'create-sequence-steps',
  {
    operation: 'create',
    resource: 'sequence-steps',
    mutation: true,
    schema: apolloCreateSequenceStep,
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.sequenceSteps.create(auth, {
      emailer_campaign_id: input.emailer_campaign_id,
      priority: input.priority,
      position: input.position,
      type: input.type,
      wait_mode: input.wait_mode,
      wait_time: input.wait_time,
      exact_datetime: input.exact_datetime,
    });
  },
);

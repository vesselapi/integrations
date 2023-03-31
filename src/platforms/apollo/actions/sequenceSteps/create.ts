import { action } from '../../../../sdk';
import { client } from '../../client';
import { apolloCreateSequenceStep } from '../../schemas';

export default action(
  'list-sequence-steps',
  {
    operation: 'list',
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

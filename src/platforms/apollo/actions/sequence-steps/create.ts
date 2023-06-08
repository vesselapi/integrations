import { client } from '@/platforms/apollo/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'create-sequence-steps',
  {
    operation: 'create',
    resource: 'sequence-steps',
    mutation: true,
    schema: z.object({
      emailerCampaignId: z.string(),
      priority: z.string().optional(),
      position: z.number().optional(),
      type: z.string().optional(),
      waitMode: z.string().optional(),
      waitTime: z.number().optional(),
      exactDatetime: z.string().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.sequenceSteps.create(auth, {
      emailer_campaign_id: input.emailerCampaignId,
      priority: input.priority,
      position: input.position,
      type: input.type,
      wait_mode: input.waitMode,
      wait_time: input.waitTime,
      exact_datetime: input.exactDatetime,
    });

    return {
      emailerStep: result.data.emailer_step,
      emailerTouch: result.data.emailer_touch,
      emailerTemplate: result.data.emailer_template,
      $native: result.$native,
    };
  },
);

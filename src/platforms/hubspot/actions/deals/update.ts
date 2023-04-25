import { transformDeal } from '@/platforms/hubspot/actions/mappers';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';
import client from '../../client';

export default action(
  'deals-update',
  {
    operation: 'update',
    resource: 'deals',
    mutation: true,
    schema: z
      .object({
        closeDate: custom.date(),
        dealName: z.string().optional(),
        amount: z.string().optional(),
        hsDealStageProbability: z.string().optional(),
        dealStage: z.string().optional(),
      })
      .partial()
      .extend({
        id: z.string(),
      }),
    scopes: ['crm.objects.deals.write'],
  },
  async ({ auth, input }) => {
    const result = await client.deals.update(auth, {
      id: input.id,
      dealname: input.dealName,
      amount: input.amount,
      closedate: input.closeDate,
      hs_deal_stage_probability: input.hsDealStageProbability,
      dealstage: input.dealStage,
    });

    return {
      ...transformDeal(result.data),
      $native: result.$native,
    };
  },
);

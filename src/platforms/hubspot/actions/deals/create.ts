import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

import { transformDeal } from '@/platforms/hubspot/actions/mappers';
import * as custom from '@/sdk/validators';

export default action(
  'deals-create',
  {
    operation: 'create',
    resource: 'deals',
    mutation: true,
    schema: z.object({
      closeDate: custom.date(),
      dealName: z.string().optional(),
      amount: z.string().optional(),
      hsDealStageProbability: z.string().optional(),
      dealStage: z.string().optional(),
    }),
    scopes: ['crm.objects.deals.write'],
  },
  async ({ auth, input }) => {
    const result = await client.deals.create(auth, {
      closedate: input.closeDate,
      dealname: input.dealName,
      amount: input.amount,
      hs_deal_stage_probability: input.hsDealStageProbability,
      dealstage: input.dealStage,
    });

    return {
      ...transformDeal(result.data),
      $native: result.$native,
    };
  },
);

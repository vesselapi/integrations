import { transformDeal } from '@/platforms/hubspot/actions/mappers';
import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';
import { hubspotCommonAssociationsSchema } from '../../schemas';

export default action(
  'find-deal',
  {
    operation: 'find',
    resource: 'deals',
    mutation: false,
    schema: z.object({
      id: z.string(),
      associations: z.array(hubspotCommonAssociationsSchema).optional(),
    }),
    scopes: ['crm.objects.deals.read'],
  },
  async ({ auth, input }) => {
    const result = await client.deals.find(auth, {
      id: input.id,
    });

    return {
      ...transformDeal(result.data),
      $native: result.$native,
    };
  },
);

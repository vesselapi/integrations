import { transformDeal } from '@/platforms/hubspot/actions/mappers';
import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';
import { hubspotCommonAssociationsSchema } from '../../schemas';

export default action(
  'list-deals',
  {
    operation: 'list',
    resource: 'deals',
    mutation: false,
    schema: z.object({
      after: z.string().optional(),
      pageSize: z.number().optional(),
      associations: z.array(hubspotCommonAssociationsSchema).optional(),
    }),
    scopes: ['crm.objects.deals.read'],
  },
  async ({ auth, input }) => {
    const result = await client.deals.list(auth, input);

    return {
      paging: result.data.paging,
      results: result.data.results?.map(transformDeal),
      $native: result.$native,
    };
  },
);

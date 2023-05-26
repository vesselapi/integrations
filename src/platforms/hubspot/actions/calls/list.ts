import { transformCall } from '@/platforms/hubspot/actions/mappers';
import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';
import { hubspotCommonAssociationsSchema } from '../../schemas';

export default action(
  'list-calls',
  {
    operation: 'list',
    resource: 'calls',
    mutation: false,
    schema: z.object({
      after: z.string().optional(),
      pageSize: z.number().optional(),
      associations: z.array(hubspotCommonAssociationsSchema).optional(),
    }),
    scopes: [],
  },
  async ({ auth, input }) => {
    const result = await client.calls.list(auth, input);

    return {
      paging: result.data.paging,
      results: result.data.results?.map(transformCall),
      $native: result.$native,
    };
  },
);

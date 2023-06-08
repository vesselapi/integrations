import { transformCall } from '@/platforms/hubspot/actions/mappers';
import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';
import { hubspotCommonAssociationsSchema } from '../../schemas';

export default action(
  'find-call',
  {
    operation: 'find',
    resource: 'calls',
    mutation: false,
    schema: z.object({
      id: z.string(),
      associations: z.array(hubspotCommonAssociationsSchema).optional(),
    }),
    scopes: [],
  },
  async ({ auth, input }) => {
    const result = await client.calls.find(auth, {
      id: input.id,
    });

    return {
      ...transformCall(result.data),
      $native: result.$native,
    };
  },
);

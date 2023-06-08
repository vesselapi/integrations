import { transformMeeting } from '@/platforms/hubspot/actions/mappers';
import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';
import { hubspotCommonAssociationsSchema } from '../../schemas';

export default action(
  'find-meeting',
  {
    operation: 'find',
    resource: 'meetings',
    mutation: false,
    schema: z.object({
      id: z.string(),
      associations: z.array(hubspotCommonAssociationsSchema).optional(),
    }),
    scopes: [],
  },
  async ({ auth, input }) => {
    const result = await client.meetings.find(auth, {
      id: input.id,
    });

    return {
      ...transformMeeting(result.data),
      $native: result.$native,
    };
  },
);

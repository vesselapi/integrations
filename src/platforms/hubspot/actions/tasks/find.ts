import { transformTask } from '@/platforms/hubspot/actions/mappers';
import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';
import { hubspotCommonAssociationsSchema } from '../../schemas';

export default action(
  'find-task',
  {
    operation: 'find',
    resource: 'tasks',
    mutation: false,
    schema: z.object({
      id: z.string(),
      associations: z.array(hubspotCommonAssociationsSchema).optional(),
    }),
    scopes: [],
  },
  async ({ auth, input }) => {
    const result = await client.tasks.find(auth, {
      id: input.id,
    });

    return {
      ...transformTask(result.data),
      $native: result.$native,
    };
  },
);

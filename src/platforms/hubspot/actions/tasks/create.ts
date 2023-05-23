import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

import { transformTask } from '@/platforms/hubspot/actions/mappers';

export default action(
  'tasks-create',
  {
    operation: 'create',
    resource: 'tasks',
    mutation: true,
    schema: z.object({
      hsTaskBody: z.string(),
      hsTaskSubject: z.string(),
      hsTaskStatus: z.string(),
      hsTaskPriority: z.string(),
      hsTimestamp: z.string(),
      hubspotOwnerId: z.string(),
    }),
    scopes: [],
  },
  async ({ auth, input }) => {
    const result = await client.tasks.create(auth, {
      hs_task_body: input.hsTaskBody,
      hs_task_subject: input.hsTaskSubject,
      hs_task_status: input.hsTaskStatus,
      hs_task_priority: input.hsTaskPriority,
      hs_timestamp: input.hsTimestamp,
      hubspot_owner_id: input.hubspotOwnerId,
    });

    return {
      ...transformTask(result.data),
      $native: result.$native,
    };
  },
);

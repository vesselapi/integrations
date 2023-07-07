import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

export default action(
  'groups-create',
  {
    operation: 'create',
    resource: 'groups',
    mutation: true,
    schema: z.object({
      boardId: z.number(),
      groupName: z.string(),
    }),
    scopes: [],
  },
  async ({ auth, input }) => {
    const { data, $native } = await client.groups.create(auth, {
      board_id: input.boardId,
      group_name: input.groupName,
    });
    return {
      id: data.data?.create_group.id ?? null,
      errors: data.errors ?? null,
      $native,
    };
  },
);

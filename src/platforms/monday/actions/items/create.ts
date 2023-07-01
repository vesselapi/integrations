import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

export default action(
  'items-create',
  {
    operation: 'create',
    resource: 'items',
    mutation: true,
    schema: z.object({
      boardId: z.number(),
      groupId: z.number().optional(),
      itemName: z.string(),
      columnValues: z.record(z.union([z.string(), z.number()])),
    }),
    scopes: [],
  },
  async ({ auth, input }) => {
    const { data, $native } = await client.items.create(auth, {
      board_id: input.boardId,
      group_id: input.groupId,
      item_name: input.itemName,
      column_values: input.columnValues,
    });
    return {
      id: data.data?.create_item.id ?? null,
      $native,
    };
  },
);

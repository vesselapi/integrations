import { mapValues } from 'radash';
import { z } from 'zod';
import { MONDAY_MODULES } from './constants';

export const mondayQueryResponse = z.object({ data: z.any() });
export type MondayQueryResponse = z.infer<typeof mondayQueryResponse>;

export type MondayModule = (typeof MONDAY_MODULES)[number];

// -
// Client Definitions
// -
export const listInputSchema = z.object({
  limit: z.number(),
  page: z.number(),
});
export type ListInput = z.infer<typeof listInputSchema>;

// -
// Boards
// -
export const mondayBoardsFieldsSchema = z.object({
  id: z.number(),
  name: z.string(),
  state: z.string(),
  permissions: z.string(),
});
export const mondayBoardsFields = Object.keys(mondayBoardsFieldsSchema.shape);
export const mondayBoardsRelationalFieldsSchema = {
  columns: z.object({
    id: z.string(),
    description: z.string().optional(),
    title: z.string(),
    type: z.string(),
  }),
  groups: z.object({
    id: z.string(),
    title: z.string(),
  }),
};
export const mondayBoardsRelationalFields = mapValues(
  mondayBoardsRelationalFieldsSchema,
  (value) => Object.keys(value.shape),
);
export const mondayBoardsSchema = mondayBoardsFieldsSchema.extend(
  mapValues(mondayBoardsRelationalFieldsSchema, (value) => z.array(value)),
);
export type MondayBoards = z.infer<typeof mondayBoardsSchema>;
export const mondayBoardsListResponseSchema = z.object({
  data: z
    .object({
      boards: z.array(mondayBoardsSchema),
    })
    .optional(),
});

// -
// Items
// -
export const mondayItemsCreateSchema = z.object({
  board_id: z.number(),
  group_id: z.string().optional(),
  item_name: z.string(),
  column_values: z.record(z.union([z.string(), z.number()])),
});
export type MondayItemCreate = z.infer<typeof mondayItemsCreateSchema>;
export const mondayItemCreateResponseSchema = z.object({
  data: z.object({ create_item: z.object({ id: z.number() }) }).optional(),
});

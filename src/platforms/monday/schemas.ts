import { z } from 'zod';

export const mondayQueryResponse = z.object({ data: z.any() });
export type MondayQueryResponse = z.infer<typeof mondayQueryResponse>;

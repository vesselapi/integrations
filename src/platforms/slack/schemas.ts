import * as custom from '@/sdk/validators';
import { z } from 'zod';

export const slackPaginated = custom.object({
  response_metadata: custom.object({
    next_cursor: z.string(),
  }),
});

export const slackUser = custom.object({
  id: z.string(),
  name: z.string(),
  deleted: z.boolean(),
});

export const slackConversation = custom.object({
  id: z.string(),
  name: z.string(),
  created: custom.timestamp(true),
});

export type SlackUser = z.infer<typeof slackUser>;
export type SlackConversation = z.infer<typeof slackConversation>;

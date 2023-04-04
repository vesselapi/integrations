import * as custom from '@/sdk/validators';
import { z } from 'zod';

export const slackPaginated = custom.object({
  response_metadata: custom.object({
    next_cursor: z.string(),
  }),
});

export const slackExpiredAuth = custom.object({
  ok: z.literal(false),
  error: z.literal('token_expired'),
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

export const slackMessage = custom.object({
  ts: z.string(),
});

export type SlackUser = z.infer<typeof slackUser>;
export type SlackConversation = z.infer<typeof slackConversation>;
export type SlackMessage = z.infer<typeof slackMessage>;

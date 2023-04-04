import * as custom from '@/sdk/validators';
import { z } from 'zod';

export const slackPaginated = custom.passthrough({
  response_metadata: custom.passthrough({
    next_cursor: z.string(),
  }),
});

export const slackUser = custom.passthrough({
  id: z.string(),
  name: z.string(),
  deleted: z.boolean(),
});

export const slackConversation = custom.passthrough({
  id: z.string(),
  name: z.string(),
  created: custom.timestamp(true),
});

export const slackMessage = custom.passthrough({
  ts: z.string(),
});

export type SlackUser = z.infer<typeof slackUser>;
export type SlackConversation = z.infer<typeof slackConversation>;
export type SlackMessage = z.infer<typeof slackMessage>;

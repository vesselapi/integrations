import * as custom from '@/sdk/validators';
import { z } from 'zod';

export const microsoftPaginated = custom.object({
  '@odata.nextLink': z.string().optional(),
});

export const microsoftConversationMember = custom.object({
  id: z.string(),
  displayName: z.string(),
});

export const microsoftMessage = custom.object({
  id: z.string(),
  createdDateTime: custom.date(),
  body: custom.object({
    content: z.string(),
  }),
  channelIdentity: custom.object({
    teamId: z.string(),
    channelId: z.string(),
  }),
});

export const microsoftChannel = custom.object({
  id: z.string(),
  displayName: z.string(),
  createdDateTime: custom.date(),
});

export const microsoftGroup = custom.object({
  id: z.string(),
  displayName: z.string(),
});

export type MicrosoftConversationMember = z.infer<
  typeof microsoftConversationMember
>;
export type MicrosoftChannel = z.infer<typeof microsoftChannel>;
export type MicrosoftMessage = z.infer<typeof microsoftMessage>;

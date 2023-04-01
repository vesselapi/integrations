import * as custom from '@/sdk/validators';
import { z } from 'zod';

export const activeCampaignUser = custom.object({
  id: z.string(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
});
export type ActiveCampaignUser = z.infer<typeof activeCampaignUser>;

export const activeCampaignContact = custom.object({
  id: z.string(),
  email: z.string(),
  phone: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  udate: custom.date(),
  cdate: custom.date(),
});
export type ActiveCampaignContact = z.infer<typeof activeCampaignContact>;

export const activeCampaignList = custom.object({
  id: z.string(),
  name: z.string(),
  cdate: custom.date(),
});
export type ActiveCampaignList = z.infer<typeof activeCampaignList>;

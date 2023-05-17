import * as custom from '@/sdk/validators';
import { z } from 'zod';

export type WithNative<T> = T & { $native?: Record<string, unknown> };

export const mailchimpMember = custom.object({
  id: z.string(),
  email_address: z.string(),
  full_name: z.string(),
  status: z.string(),
  last_changed: custom.date(),
  timestamp_signup: custom.date(),
});
export type MailchimpMember = z.infer<typeof mailchimpMember>;

export const mailchimpList = custom.object({
  id: z.string(),
  name: z.string(),
  date_created: custom.date(),
});
export type MailchimpList = z.infer<typeof mailchimpList>;

import * as custom from '@/sdk/validators';
import { z } from 'zod';
import { aircallUrl } from './actions/validators';

export const aircallPagination = z.object({
  count: z.number().nullable(),
  total: z.number().nullable(),
  current_page: z.number().nullable(),
  per_page: z.number().nullable(),
  next_page_link: aircallUrl().nullable(),
  previous_page_link: aircallUrl().nullable(),
});

export type AircallPagination = z.infer<typeof aircallPagination>;

export const aircallUser = z.object({
  id: z.number(),
  direct_link: z.string().nullable(),
  name: z.string(),
  email: z.string().nullable(),
  available: z.boolean().nullable(),
  availability_status: z.string().nullable(),
  time_zone: z.string().nullable(),
  language: z.string().nullable(),
  wrap_up_time: z.number().nullable(),
  created_at: custom.date(),
});

export type AircallUser = z.infer<typeof aircallUser>;

export type AircallStartUserCall = {
  number_id: number | string;
  to: string;
  $native?: Record<string, unknown>;
};

export const aircallContact = z.object({
  id: z.number(),
  direct_link: z.string().nullable(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  company_name: z.string().nullable(),
  information: z.string().nullable(),
  is_shared: z.boolean().nullable(),
  created_at: custom.timestamp(true),
  updated_at: custom.timestamp(true),
  emails: z
    .array(
      z.object({
        id: z.number(),
        label: z.string().nullable(),
        value: z.string(),
      }),
    )
    .nullable(),
  phone_numbers: z
    .array(
      z.object({
        id: z.number(),
        label: z.string().nullable(),
        value: z.string(),
      }),
    )
    .nullable(),
});

export type AircallContact = z.infer<typeof aircallContact>;

export type AircallContactCreate = {
  first_name?: string;
  last_name?: string;
  company_name?: string;
  information?: string;
  emails?: {
    label?: string;
    value: string;
  }[];
  phone_numbers: {
    label?: string;
    value: string;
  }[];
  $native?: Record<string, unknown>;
};

export type AircallContactUpdate = {
  first_name?: string;
  last_name?: string;
  company_name?: string;
  information?: string;
  $native?: Record<string, unknown>;
};

export const aircallNumber = z.object({
  id: z.number(),
  name: z.string().nullable(),
  digits: z.string().nullable(),
  created_at: custom.date(),
});
export const aircallCall = z.object({
  id: z.number(),
  direct_link: z.string().nullable(),
  direction: z.enum(['inbound', 'outbound']).nullable(),
  status: z.string().nullable(),
  started_at: custom.timestamp(true).nullable(),
  answered_at: custom.timestamp(true).nullable(),
  ended_at: custom.timestamp(true).nullable(),
  duration: z.number().nullable(),
  voicemail: z.string().nullable(),
  recording: z.string().nullable(),
  raw_digits: z.string(),
  user: aircallUser,
  contact: aircallContact.nullable(),
  number: aircallNumber,
  participants: z
    .array(
      z.object({
        id: z.number(),
        type: z.enum(['user', 'contact', 'external']),
        name: z.string().nullable(),
        phone_number: z.string().nullable(),
      }),
    )
    .optional(),
});

export type AircallCall = z.infer<typeof aircallCall>;

export const aircallWebhook = z.object({
  webhook_id: z.string(),
  direct_link: z.string(),
  created_at: z.string(),
  url: z.string(),
  active: z.boolean(),
  events: z.array(z.string()),
  token: z.string(),
});

export type AircallWebhook = z.infer<typeof aircallWebhook>;

export type AircallResource = 'user' | 'number' | 'call' | 'contact';

export type AircallWebhookEvent =
  | 'user.created'
  | 'user.deleted'
  | 'user.connected'
  | 'user.disconnected'
  | 'user.opened'
  | 'user.closed'
  | 'user.wut_start'
  | 'user.wut_end'
  | 'number.created'
  | 'number.deleted'
  | 'number.opened'
  | 'number.closed'
  | 'call.created'
  | 'call.ringing_on_agent'
  | 'call.agent_declined'
  | 'call.answered'
  | 'call.transferred'
  | 'call.unsuccessful_transfer'
  | 'call.hungup'
  | 'call.ended'
  | 'call.voicemail_left'
  | 'call.assigned'
  | 'call.archived'
  | 'call.tagged'
  | 'call.untagged'
  | 'call.commented'
  | 'call.hold'
  | 'call.unhold'
  | 'contact.created'
  | 'contact.updated'
  | 'contact.deleted';

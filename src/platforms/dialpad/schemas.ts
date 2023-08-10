import { Auth, ClientResult, HttpsUrl, PlatformClient } from '@/sdk/types';
import * as custom from '@/sdk/validators';
import { z } from 'zod';

export type DialpadAccountType = 'production' | 'sandbox';
export interface DialpadAuthAnswers extends Record<string, string> {
  accountType: DialpadAccountType;
}
export const dialpadUrlsByAccountType: Record<DialpadAccountType, HttpsUrl> = {
  production: `https://dialpad.com`,
  sandbox: `https://sandbox.dialpad.com`,
};

export const listResponseSchema = (itemSchema: z.ZodSchema<any>) =>
  z.object({
    cursor: z.string().optional(),
    items: z.array(itemSchema).optional(),
  });

export const dialpadUserSchema = z.object({
  id: z.string(),
  admin_office_ids: z.array(z.string()).nullable(),
  company_id: z.string().nullable(),
  country: z.string().nullable(),
  date_active: custom.date().nullable(),
  date_added: custom.date().nullable(),
  date_first_login: custom.date().nullable(),
  do_not_disturb: z.boolean().nullable(),
  emails: z.array(z.string()).nullable(),
  first_name: z.string().nullable(),
  image_url: z.string().nullable(),
  is_admin: z.boolean().nullable(),
  is_available: z.boolean().nullable(),
  is_on_duty: z.boolean().nullable(),
  is_online: z.boolean().nullable(),
  is_super_admin: z.boolean().nullable(),
  language: z.string().nullable(),
  last_name: z.string().nullable(),
  license: z.string().nullable(),
  muted: z.boolean().nullable(),
  office_id: z.string().nullable(),
  phone_numbers: z.array(custom.formattedPhoneNumber()).nullable(),
  state: z.string().nullable(),
  timezone: z.string().nullable(),
});

export const dialpadContactSchema = z.object({
  id: z.string(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  company_name: z.string().nullable(),
  display_name: z.string().nullable(),
  emails: z.array(z.string()).nullable(),
  extension: z.string().nullable(),
  job_title: z.string().nullable(),
  owner_id: z.string().nullable(),
  phones: z.array(custom.formattedPhoneNumber()).nullable(),
  primary_email: z.string().nullable(),
  primary_phone: custom.formattedPhoneNumber().nullable(),
  type: z.enum(['shared', 'local']).nullable(),
  urls: z.array(z.string()).nullable(),
});
export const dialpadContactCreateSchema = dialpadContactSchema
  .partial()
  .required({
    first_name: true,
    last_name: true,
  })
  .omit({
    id: true,
    owner_id: true,
    display_name: true,
    // The first email and phone number are used as the primary email and phone
    primary_email: true,
    primary_phone: true,
    type: true,
  })
  .extend({
    $native: z.record(z.any()).optional(),
  });
export const dialpadContactUpdateSchema = dialpadContactSchema
  .partial()
  .required({
    first_name: true,
    last_name: true,
  })
  .omit({
    id: true,
    owner_id: true,
    display_name: true,
    // The first email and phone number are used as the primary email and phone
    primary_email: true,
    primary_phone: true,
    type: true,
  })
  .extend({
    uid: z.string(),
    $native: z.record(z.any()).optional(),
  });

export const routingBreadcrumbSchema = z.object({
  breadcrumb_type: z.string(),
  date: custom.timestamp(),
  request: z.object({
    body: z.string(),
    headers: z.string(),
    method: z.string(),
    url: z.string(),
  }),
  response: z.object({
    body: z.string(),
    headers: z.string(),
    status_code: z.number(),
  }),
  target_id: z.number(),
  target_type: z.string(),
  url: z.string(),
});

const targetSchema = z.object({
  email: z.string(),
  id: z.string(),
  name: z.string(),
  phone: custom.formattedPhoneNumber(),
  type: z.string(),
});
export const dialpadCallSchema = z.object({
  call_id: z.number(),
  admin_call_recording_share_links: z.array(z.string()).nullable(),
  call_recording_ids: z.array(z.number()).nullable(),
  call_recording_share_links: z.array(z.string()).nullable(),
  contact: dialpadContactSchema.nullable(),
  csat_recording_urls: z.array(z.string()).nullable(),
  csat_score: z.string().nullable(),
  csat_transcriptions: z.string().nullable(),
  custom_data: z.string().nullable(),
  date_connected: custom.timestamp().nullable(),
  date_ended: custom.timestamp().nullable(),
  date_rang: custom.timestamp().nullable(),
  date_started: custom.timestamp().nullable(),
  direction: z.enum(['inbound', 'outbound']).nullable(),
  duration: z.number().nullable(),
  entry_point_call_id: z.number().nullable(),
  entry_point_target: targetSchema.nullable(),
  event_timestamp: custom.timestamp().nullable(),
  external_number: z.string().nullable(),
  group_id: z.string().nullable(),
  internal_number: z.string().nullable(),
  is_transferred: z.boolean().nullable(),
  labels: z.array(z.string()).nullable(),
  master_call_id: z.number().nullable(),
  mos_score: z.number().nullable(),
  operator_call_id: z.number().nullable(),
  proxy_target: targetSchema.nullable(),
  recording_url: z.array(z.string()).nullable(),
  routing_breadcrumbs: z.array(routingBreadcrumbSchema).nullable(),
  screen_recording_urls: z.array(z.string()).nullable(),
  state: z.string().nullable(),
  target: targetSchema.nullable(),
  total_duration: z.number().nullable(),
  transcription_text: z.string().nullable(),
  voicemail_link: z.string().nullable(),
  voicemail_recording_id: z.string().nullable(),
  voicemail_share_link: z.string().nullable(),
  was_recorded: z.boolean().nullable(),
});

export const dialpadCallStartSchema = z.object({
  custom_data: z.string().optional(),
  device_id: z.string().optional(),
  group_id: z.number().optional(),
  group_type: z.string().optional(),
  outbound_caller_id: z.string().optional(),
  phone_number: custom.formattedPhoneNumber(),
  user_id: z.string(),
  $native: z.record(z.any()).optional(),
});

export type DialpadModules = 'users' | 'calls' | 'contacts';
export type DialpadUser = z.infer<typeof dialpadUserSchema>;
export type DialpadContact = z.infer<typeof dialpadContactSchema>;
export type DialpadContactCreate = z.infer<typeof dialpadContactCreateSchema>;
export type DialpadContactUpdate = z.infer<typeof dialpadContactUpdateSchema>;
export type DialpadCall = z.infer<typeof dialpadCallSchema>;
export type DialpadCallStart = z.infer<typeof dialpadCallStartSchema>;
export type DialpadRoutingBreadcrumb = z.infer<typeof routingBreadcrumbSchema>;
export type AnyDialpadObject = DialpadUser | DialpadContact | DialpadCall;

export type FindObjectInput = { id: string };
export type ListObjectInput = { cursor?: string };
export type ListOutput<T> = {
  cursor?: string;
  items?: T[];
};
type ClientAction<InputType, OutputType> = (
  auth: Auth,
  args: InputType,
) => Promise<ClientResult<OutputType>>;

export interface DialpadClient extends PlatformClient {
  users: {
    find: ClientAction<FindObjectInput, DialpadUser>;
    list: ClientAction<ListObjectInput, ListOutput<DialpadUser>>;
  };
  contacts: {
    find: ClientAction<FindObjectInput, DialpadContact>;
    list: ClientAction<ListObjectInput, ListOutput<DialpadContact>>;
    create: ClientAction<DialpadContactCreate, DialpadContact>;
    update: ClientAction<DialpadContactUpdate, DialpadContact>;
  };
  calls: {
    find: ClientAction<FindObjectInput, DialpadCall>;
    list: ClientAction<ListObjectInput, ListOutput<DialpadCall>>;
    start: ClientAction<DialpadCallStart, Pick<DialpadCall, 'call_id'>>;
  };
}

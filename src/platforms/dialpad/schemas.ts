import * as custom from '@/sdk/validators';
import parsePhoneNumber from 'libphonenumber-js';
import { z } from 'zod';
import { Auth, PlatformClient } from '../../sdk/types';

export const listResponseSchema = (itemSchema: z.ZodSchema<any>) =>
  z
    .object({
      cursor: z.string().optional(),
      items: z.array(itemSchema).optional(),
    })
    .passthrough();

export const dialpadUserSchema = z
  .object({
    admin_office_ids: z.array(z.string()),
    company_id: z.string(),
    country: z.string(),
    date_active: custom.date(),
    date_added: custom.date(),
    date_first_login: custom.date(),
    do_not_disturb: z.boolean(),
    emails: z.array(z.string()),
    first_name: z.string(),
    id: z.string(),
    image_url: z.string(),
    is_admin: z.boolean(),
    is_available: z.boolean(),
    is_on_duty: z.boolean(),
    is_online: z.boolean(),
    is_super_admin: z.boolean(),
    language: z.string(),
    last_name: z.string(),
    license: z.string(),
    muted: z.boolean(),
    office_id: z.string(),
    phone_numbers: z.array(z.string()),
    state: z.string(),
    timezone: z.string(),
  })
  .passthrough();

export const dialpadContactSchema = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  company_name: z.string(),
  display_name: z.string(),
  emails: z.array(z.string()),
  extension: z.string(),
  job_title: z.string(),
  owner_id: z.string(),
  phones: z.array(z.string()),
  primary_email: z.string(),
  primary_phone: z.string(),
  type: z.enum(['shared', 'local']),
  urls: z.array(z.string()),
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
  });

export const routingBreadcrumbSchema = z
  .object({
    breadcrumb_type: z.string(),
    date: custom.timestamp(),
    request: z
      .object({
        body: z.string(),
        headers: z.string(),
        method: z.string(),
        url: z.string(),
      })
      .passthrough(),
    response: z
      .object({
        body: z.string(),
        headers: z.string(),
        status_code: z.number(),
      })
      .passthrough(),
    target_id: z.number(),
    target_type: z.string(),
    url: z.string(),
  })
  .passthrough();

const targetSchema = z
  .object({
    email: z.string(),
    id: z.string(),
    name: z.string(),
    phone: z.string(),
    type: z.string(),
  })
  .passthrough();

export const dialpadCallSchema = z
  .object({
    admin_call_recording_share_links: z.array(z.string()),
    call_id: z.number(),
    call_recording_ids: z.array(z.number()),
    call_recording_share_links: z.array(z.string()),
    contact: dialpadContactSchema,
    csat_recording_urls: z.array(z.string()),
    csat_score: z.string(),
    csat_transcriptions: z.string(),
    custom_data: z.string(),
    date_connected: custom.timestamp(),
    date_ended: custom.timestamp(),
    date_rang: custom.timestamp(),
    date_started: custom.timestamp(),
    direction: z.enum(['inbound', 'outbound']),
    duration: z.number(),
    entry_point_call_id: z.number(),
    entry_point_target: targetSchema,
    event_timestamp: custom.timestamp(),
    external_number: z.string(),
    group_id: z.string(),
    internal_number: z.string(),
    is_transferred: z.boolean(),
    labels: z.array(z.string()),
    master_call_id: z.number(),
    mos_score: z.number(),
    operator_call_id: z.number(),
    proxy_target: targetSchema,
    recording_url: z.array(z.string()),
    routing_breadcrumbs: z.array(routingBreadcrumbSchema),
    screen_recording_urls: z.array(z.string()),
    state: z.string(),
    target: targetSchema,
    total_duration: z.number(),
    transcription_text: z.string(),
    voicemail_link: z.string(),
    voicemail_recording_id: z.string(),
    voicemail_share_link: z.string(),
    was_recorded: z.boolean(),
  })
  .passthrough();

export const dialpadCallStartSchema = z.object({
  custom_data: z.string().optional(),
  device_id: z.string().optional(),
  group_id: z.number().optional(),
  group_type: z.string().optional(),
  outbound_caller_id: z.string().optional(),
  phone_number: z
    .string()
    .refine((value) => {
      return parsePhoneNumber(value)?.isValid();
    })
    .transform((value) => {
      return parsePhoneNumber(value)?.format('E.164');
    }),
  user_id: z.string(),
});

export type DialpadModules = 'users' | 'calls' | 'contacts';
export type DialpadUser = z.infer<typeof dialpadUserSchema>;
export type DialpadContact = z.infer<typeof dialpadContactSchema>;
export type DialpadContactCreate = z.infer<typeof dialpadContactCreateSchema>;
export type DialpadContactUpdate = z.infer<typeof dialpadContactUpdateSchema>;
export type DialpadCall = z.infer<typeof dialpadCallSchema>;
export type DialpadCallStart = z.infer<typeof dialpadCallStartSchema>;
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
) => Promise<OutputType>;

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
    start: ClientAction<DialpadCallStart, Pick<DialpadCall, 'id'>>;
  };
}

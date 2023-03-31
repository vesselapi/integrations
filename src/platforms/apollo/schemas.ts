import * as custom from '@/sdk/validators';
import { z } from 'zod';

export const apolloPaginatedResponse = z
  .object({
    page: z.number().nullable(),
    per_page: z.number(),
    total_entries: z.number(),
    total_pages: z.number(),
  })
  .passthrough();

export const apolloUser = z
  .object({
    id: z.string(),
    first_name: z.string().nullish(),
    last_name: z.string().nullish(),
    email: z.string().nullish(),
    team_id: z.string().nullish(),
    created_at: custom.date(),
  })
  .passthrough();

export type ApolloUser = z.infer<typeof apolloUser>;

export const apolloContact = z
  .object({
    id: z.string(),
    first_name: z.string().nullish(),
    last_name: z.string().nullish(),
    name: z.string().nullish(),
    title: z.string().nullish(),
    owner_id: z.string().nullish(),
    present_raw_address: z.string().nullish(),
    phone_numbers: z.array(
      z
        .object({
          raw_number: z.string(),
          sanitized_number: z.string().nullish(),
          type: z.enum(['mobile', 'home', 'work_hq', 'work_direct', 'other']),
          position: z.number(),
          status: z.string().nullish(),
          dnc_status: z.string().nullish(),
        })
        .passthrough(),
    ),
    organization_name: z.string().nullish(),
    email: z.string().nullish(),
    website_url: z.string().nullish(),
    contact_stage_id: z.string().nullish(),
    account_id: z.string().nullish(),
    created_at: custom.date(),
    updated_at: custom.date(),
  })
  .passthrough();

export type ApolloContact = z.infer<typeof apolloContact>;

export const apolloContactCreate = z
  .object({
    first_name: z.string().nullish(),
    last_name: z.string().nullish(),
    organization_name: z.string().nullish(),
    title: z.string().nullish(),
    owner_id: z.string().nullish(),
    account_id: z.string().nullish(),
    email: z.string().nullish(),
    website_url: z.string().nullish(),
    contact_stage_id: z.string().nullish(),
    present_raw_address: z.string().nullish(),
    label_names: z.array(z.string()).nullish(),
  })
  .passthrough();

export const apolloContactUpdate = z
  .object({
    first_name: z.string().nullish(),
    last_name: z.string().nullish(),
    organization_name: z.string().nullish(),
    title: z.string().nullish(),
    owner_id: z.string().nullish(),
    account_id: z.string().nullish(),
    email: z.string().nullish(),
    website_url: z.string().nullish(),
    present_raw_address: z.string().nullish(),
    label_names: z.array(z.string()).nullish(),
  })
  .passthrough();

export type ApolloContactCreate = z.infer<typeof apolloContactCreate>;

export type ApolloContactUpdate = z.infer<typeof apolloContactUpdate>;

export const apolloSequence = z
  .object({
    id: z.string(),
    name: z.string().nullish(),
    created_at: custom.date(),
    active: z.boolean(),
    label_ids: z.array(z.string()),
    num_steps: z.number().nullish(),
    user_id: z.string().nullish(),
    // TODO: type the string validation better. This is technically an enum of 'loading' values
    // for some reason, but there's no clear documentation on what these can be.
    unique_scheduled: z.union([z.number(), z.string()]).nullish(),
    unique_delivered: z.union([z.number(), z.string()]).nullish(),
    unique_bounced: z.union([z.number(), z.string()]).nullish(),
    unique_opened: z.union([z.number(), z.string()]).nullish(),
    unique_replied: z.union([z.number(), z.string()]).nullish(),
    unique_demoed: z.union([z.number(), z.string()]).nullish(),
    unique_clicked: z.union([z.number(), z.string()]).nullish(),
    unique_unsubscribed: z.union([z.number(), z.string()]).nullish(),
    bounce_rate: z.union([z.number(), z.string()]).nullish(),
    open_rate: z.union([z.number(), z.string()]).nullish(),
    click_rate: z.union([z.number(), z.string()]).nullish(),
    reply_rate: z.union([z.number(), z.string()]).nullish(),
    spam_blocked_rate: z.union([z.number(), z.string()]).nullish(),
    opt_out_rate: z.union([z.number(), z.string()]).nullish(),
    demo_rate: z.union([z.number(), z.string()]).nullish(),
  })
  .passthrough();

export type ApolloSequence = z.infer<typeof apolloSequence>;

export const apolloEmailAccount = z
  .object({
    id: z.string(),
    email: z.string().nullish(),
    default: z.boolean(),
    user_id: z.string().nullish(),
  })
  .passthrough();

export type ApolloEmailAccount = z.infer<typeof apolloEmailAccount>;

export const apolloAccount = z
  .object({
    id: z.string(),
    name: z.string().nullish(),
    website_url: z.string().nullish(),
    estimated_num_employees: z.number().nullish(),
    industry: z.string().nullish(),
    organization_raw_address: z.string().nullish(),
    organization_city: z.string().nullish(),
    organization_street_address: z.string().nullish(),
    organization_state: z.string().nullish(),
    organization_country: z.string().nullish(),
    organization_postal_code: z.string().nullish(),
    domain: z.string().nullish(),
    owner_id: z.string().nullish(),
    last_activity_date: custom.date().nullish(),
    sanitized_phone: z.string().nullish(),
    created_at: custom.date(),
  })
  .passthrough();

export type ApolloAccount = z.infer<typeof apolloAccount>;

export const apolloAccountUpdate = z
  .object({
    id: z.string(),
    name: z.string().nullish(),
    domain: z.string().nullish(),
    phone: z.string().nullish(),
  })
  .passthrough();

export const apolloAccountCreate = z
  .object({
    name: z.string().nullish(),
    domain: z.string().nullish(),
    phone: z.string().nullish(),
  })
  .passthrough();
export type ApolloAccountCreate = z.infer<typeof apolloAccountCreate>;

export type ApolloAccountUpdate = z.infer<typeof apolloAccountUpdate>;

export const apolloEmailMessage = z
  .object({
    id: z.string(),
    body_text: z.string().nullish(),
    body_html: z.string().nullish(),
    bounce: z.boolean().nullish(),
    completed_at: custom.date().nullish(),
    contact_id: z.string(),
    created_at: custom.date(),
    emailer_campaign_id: z.string().nullish(),
    from_email: z.string(),
    from_name: z.string().nullish(),
    num_clicks: z.number().nullish(),
    num_opens: z.number().nullish(),
    replied: z.boolean().nullish(),
    status: z.string().nullish(),
    subject: z.string().nullish(),
    user_id: z.string(),
  })
  .passthrough();

export type ApolloEmailMessage = z.infer<typeof apolloEmailMessage>;

export const apolloEmailActivity = z
  .object({
    id: z.string(),
    type: z.string(),
    emailer_message_id: z.string(),
    emailer_message: apolloEmailMessage.passthrough(),
  })
  .passthrough();

export type ApolloEmailActivity = z.infer<typeof apolloEmailActivity>;

export const apolloCreateSequence = z.object({
  creation_type: z.string(),
  name: z.string().nullable(),
  permissions: z.string(),
  type: z.string().nullable(),
  active: z.boolean().nullable(),
});

export type ApolloCreateSequence = z.infer<typeof apolloCreateSequence>;

export const apolloCreateSequenceStep = z.object({
  emailer_campaign_id: z.string(),
  priority: z.string().nullable(),
  position: z.number().nullable(),
  type: z.string().nullable(),
  wait_mode: z.string().nullable(),
  wait_time: z.number().nullable(),
  exact_datetime: z.string().nullable(),
});

export type ApolloCreateSequenceStep = z.infer<typeof apolloCreateSequenceStep>;

export const apolloCreateTemplate = z.object({
  name: z.string().nullable(),
  user_id: z.string().nullable(),
  subject: z.string().nullable(),
  global: z.boolean().nullable(),
  body_html: z.string().nullable(),
  body_text: z.string().nullable(),
  creation_type: z.string().nullable(),
  label_ids: z.array(z.string()).nullable(),
});

export type ApolloCreateTemplate = z.infer<typeof apolloCreateTemplate>;

export const apolloCreateSequenceTemplate = z.object({
  emailer_template: apolloCreateTemplate.passthrough(),
  emailer_step_id: z.string(),
  emailer_template_id: z.string(),
  status: z.string().nullable(),
  type: z.string().nullable(),
  include_signature: z.boolean().nullable(),
});

export type ApolloUpdateSequenceTemplate = z.infer<
  typeof apolloCreateSequenceTemplate
>;

export const apolloCreateSequenceTemplateResponse = z
  .object({
    emailer_touch: z
      .object({
        id: z.string(),
      })
      .passthrough(),
  })
  .passthrough();

export const apolloCustomField = z
  .object({
    id: z.string(),
    modality: z.string(),
    name: z.string(),
    type: z.string(),
  })
  .passthrough();

export type ApolloCustomField = z.infer<typeof apolloCustomField>;

export type ApolloCreateCustomField = {
  modality: 'contact' | 'account';
  name: string;
  type: string;
};

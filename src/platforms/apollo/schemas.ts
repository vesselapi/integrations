import * as custom from '@/sdk/validators';
import { z } from 'zod';

export const apolloPaginatedResponse = z.object({
  page: z.number().nullable(),
  per_page: z.number(),
  total_entries: z.number(),
  total_pages: z.number(),
});

export type ApolloPaginatedResponse = z.infer<typeof apolloPaginatedResponse>;

export const apolloUser = custom.addNativeToZodSchema(
  z.object({
    id: z.string(),
    first_name: z.string().nullish(),
    last_name: z.string().nullish(),
    email: z.string().nullish(),
    team_id: z.string().nullish(),
    created_at: custom.date(),
  }),
);

export type ApolloUser = z.infer<typeof apolloUser>;

export const apolloContact = custom.addNativeToZodSchema(
  z.object({
    id: z.string(),
    first_name: z.string().nullish(),
    last_name: z.string().nullish(),
    name: z.string().nullish(),
    title: z.string().nullish(),
    owner_id: z.string().nullish(),
    present_raw_address: z.string().nullish(),
    phone_numbers: z.array(
      z.object({
        raw_number: z.string(),
        sanitized_number: z.string().nullish(),
        type: z.enum(['mobile', 'home', 'work_hq', 'work_direct', 'other']),
        position: z.number(),
        status: z.string().nullish(),
        dnc_status: z.string().nullish(),
      }),
    ),
    organization_name: z.string().nullish(),
    email: z.string().nullish(),
    website_url: z.string().nullish(),
    contact_stage_id: z.string().nullish(),
    account_id: z.string().nullish(),
    created_at: custom.date(),
    updated_at: custom.date(),
    typed_custom_fields: z.record(z.any()),
  }),
);

export type ApolloContact = z.infer<typeof apolloContact>;

export const apolloPerson = custom.addNativeToZodSchema(
  z.object({
    id: z.string(),
    first_name: z.string().nullish(),
    last_name: z.string().nullish(),
    name: z.string().nullish(),
  }),
);

export type ApolloPerson = z.infer<typeof apolloPerson>;

export const apolloContactCreate = z.object({
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
  typed_custom_fields: z.record(z.string()).optional(),
  $native: z.record(z.any()).optional(),
});

export const apolloContactUpdate = z.object({
  id: z.string(),
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
  typed_custom_fields: z.record(z.string()).optional(),
  $native: z.record(z.any()).optional(),
});

export type ApolloContactCreate = z.infer<typeof apolloContactCreate>;

export type ApolloContactUpdate = z.infer<typeof apolloContactUpdate>;

export const apolloLabel = z.object({
  id: z.string(),
  name: z.string(),
  created_at: custom.date(),
  updated_at: custom.date(),
});

export type ApolloLabel = z.infer<typeof apolloLabel>;

export const apolloSequence = custom.addNativeToZodSchema(
  z.object({
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
  }),
);

export type ApolloSequence = z.infer<typeof apolloSequence>;

export const apolloEmailAccount = custom.addNativeToZodSchema(
  z.object({
    id: z.string(),
    email: z.string().nullish(),
    default: z.boolean(),
    user_id: z.string().nullish(),
  }),
);

export type ApolloEmailAccount = z.infer<typeof apolloEmailAccount>;

export const apolloAccount = custom.addNativeToZodSchema(
  z.object({
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
  }),
);

export type ApolloAccount = z.infer<typeof apolloAccount>;

export const apolloAccountUpdate = z.object({
  id: z.string(),
  name: z.string().nullish(),
  domain: z.string().nullish(),
  phone: z.string().nullish(),
  $native: z.record(z.any()).optional(),
});

export const apolloAccountCreate = z.object({
  name: z.string().nullish(),
  domain: z.string().nullish(),
  phone: z.string().nullish(),
  $native: z.record(z.any()).optional(),
});
export type ApolloAccountCreate = z.infer<typeof apolloAccountCreate>;

export type ApolloAccountUpdate = z.infer<typeof apolloAccountUpdate>;

export const apolloEmailMessage = custom.addNativeToZodSchema(
  z.object({
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
  }),
);

export type ApolloEmailMessage = z.infer<typeof apolloEmailMessage>;

export const apolloEmailActivity = custom.addNativeToZodSchema(
  z.object({
    id: z.string(),
    type: z.string(),
    emailer_message_id: z.string(),
    emailer_message: apolloEmailMessage,
  }),
);

export type ApolloEmailActivity = z.infer<typeof apolloEmailActivity>;

export const apolloTask = custom.addNativeToZodSchema(
  z.object({
    id: z.string(),
    user_id: z.string(),
    created_at: custom.date(),
    completed_at: custom.date().nullish(),
    note: z.string().nullish(),
    skipped_at: custom.date().nullish(),
    due_at: custom.date().nullish(),
    type: z.string().nullish(),
    priority: z.string().nullish(),
    status: z.string().nullish(),
    answered: z.boolean().nullish(),
    emailer_campaign_id: z.string().nullish(),
    contact_id: z.string().nullish(),
    person_id: z.string().nullish(),
    account_id: z.string().nullish(),
    organization_id: z.string().nullish(),
    persona_ids: z.array(z.string()).nullish(),
    subject: z.string().nullish(),
    created_from: z.string().nullish(),
    salesforce_type: z.string().nullish(),
    playbook_step_ids: z.array(z.string()).nullish(),
    playbook_id: z.string().nullish(),
    needs_playbook_autoprospecting: z.boolean().nullish(),
    starred_by_user_ids: z.array(z.string()).nullish(),
    salesforce_id: z.string().nullish(),
    hubspot_id: z.string().nullish(),
    account: apolloAccount,
    contact: apolloContact,
  }),
);
export type ApolloTask = z.infer<typeof apolloTask>;

export const apolloTaskBulkCompleteInput = z.object({
  ids: z.array(z.string()),
  async: z.boolean(),
  sync_index_tasks: z.boolean(),
  cacheKey: z.number(),
});
export type ApolloTaskBulkCompleteInput = z.infer<
  typeof apolloTaskBulkCompleteInput
>;

export const apolloTaskBulkCompleteResponse = z.object({
  tasks: z.array(z.object({ id: z.string() })),
});

export const apolloCall = custom.addNativeToZodSchema(
  z.object({
    id: z.string(),
    user_id: z.string(),
    contact_id: z.string(),
    account_id: z.string().nullish(),
    phone_call_outcome_id: z.string().nullish(),
    recording_url: z.string().nullish(),
    inbound: z.boolean().nullish(),
    from_number: z.string().nullish(),
    to_number: z.string().nullish(),
    start_time: custom.date().nullish(),
    end_time: custom.date().nullish(),
    note_text: z.string().nullish(),
    duration: z.number().nullish(),
  }),
);
export type ApolloCall = z.infer<typeof apolloCall>;

export const apolloCallCreate = z.object({
  contact_id: z.string(),
  phone_call_outcome_id: z.string(),
  user_id: z.string().nullish(),
  phone_call_purpose_id: z.string().nullish(),
  note: z.string().nullish(),
  mark_all_sequences_as_finished: z.boolean().nullish(),
  cacheKey: z.number(),
  from_number: z.string().nullish(),
  to_number: z.string().nullish(),
  inbound: z.boolean().nullish(),
  duration: z.number().nullish(),
});
export type ApolloCallCreate = z.infer<typeof apolloCallCreate>;

export const apolloCallDisposition = custom.addNativeToZodSchema(
  z.object({
    id: z.string(),
    team_id: z.string().nullish(),
    name: z.string().nullish(),
    answered: z.boolean().nullish(),
    order: z.number().nullish(),
    trigger_contact_stage_id: z.string().nullish(),
    sentiment: z.string().nullish(),
  }),
);
export type ApolloCallDisposition = z.infer<typeof apolloCallDisposition>;

export const apolloCallPurpose = z.object({
  id: z.string(),
  team_id: z.string().nullish(),
  name: z.string().nullish(),
  settings_list_position: z.number().nullish(),
});
export type ApolloCallPurpose = z.infer<typeof apolloCallPurpose>;

export const apolloCreateSequence = z.object({
  creation_type: z.string().optional(),
  name: z.string().optional(),
  permissions: z.string(),
  type: z.string().optional(),
  active: z.boolean().optional(),
  $native: z.record(z.any()).optional(),
});

export type ApolloCreateSequence = z.infer<typeof apolloCreateSequence>;

export const apolloSequenceStep = custom.addNativeToZodSchema(
  z.object({
    emailer_step: z.object({
      id: z.string(),
    }),
    emailer_touch: z.object({
      id: z.string(),
    }),
    emailer_template: z.object({
      id: z.string(),
    }),
  }),
);

export type ApolloSequenceStep = z.infer<typeof apolloSequenceStep>;

export const apolloCreateSequenceStep = z.object({
  emailer_campaign_id: z.string(),
  priority: z.string().optional(),
  position: z.number().optional(),
  type: z.string().optional(),
  wait_mode: z.string().optional(),
  wait_time: z.number().optional(),
  exact_datetime: z.string().optional(),
  $native: z.record(z.any()).optional(),
});

export type ApolloCreateSequenceStep = z.infer<typeof apolloCreateSequenceStep>;

export const apolloCreateTemplate = z.object({
  name: z.string().optional(),
  user_id: z.string().optional(),
  subject: z.string().optional(),
  global: z.boolean().optional(),
  body_html: z.string().optional(),
  body_text: z.string().optional(),
  creation_type: z.string().optional(),
  label_ids: z.array(z.string()).optional(),
  $native: z.record(z.any()).optional(),
});

export type ApolloCreateTemplate = z.infer<typeof apolloCreateTemplate>;

export const apolloUpdateSequenceTemplate = z.object({
  id: z.string(),
  emailer_template: apolloCreateTemplate,
  emailer_step_id: z.string(),
  emailer_template_id: z.string().optional(),
  status: z.string().optional(),
  type: z.string().optional(),
  include_signature: z.boolean().optional(),
  $native: z.record(z.any()).optional(),
});

export type ApolloUpdateSequenceTemplate = z.infer<
  typeof apolloUpdateSequenceTemplate
>;

export const apolloCreateSequenceTemplateResponse = z.object({
  emailer_touch: z.object({
    id: z.string(),
  }),
});

export const apolloCustomField = z.object({
  id: z.string(),
  modality: z.string(),
  name: z.string(),
  type: z.string(),
});

export const apolloBootstrappedDataSchema = z.object({
  bootstrapped_data: z.object({
    current_user_id: z.string().nullish(),
    current_team_id: z.string().nullish(),
    phone_call_outcomes: z.array(apolloCallDisposition).nullish(),
    phone_call_purposes: z.array(apolloCallPurpose).nullish(),
  }),
});

export type ApolloCustomField = z.infer<typeof apolloCustomField>;

export type ApolloCreateCustomField = {
  modality: 'contact' | 'account';
  name: string;
  type: string;
  $native?: Record<string, unknown>;
};

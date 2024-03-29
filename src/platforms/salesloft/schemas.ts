import * as custom from '@/sdk/validators';
import { z } from 'zod';

export const salesloftOAuthResponse = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
});

export type SalesloftOAuthResponse = z.infer<typeof salesloftOAuthResponse>;

export const salesloftResponseMetadata = z.object({
  paging: z
    .object({
      per_page: z.number(),
      current_page: z.number(),
      next_page: z.number().nullish(),
      prev_page: z.number().nullish(),
    })
    .optional(),
});
export type SalesloftMetadata = z.infer<typeof salesloftResponseMetadata>;

export const salesloftPerson = custom.addNativeToZodSchema(
  z.object({
    id: z.number(),
    first_name: z.string().nullish(),
    last_name: z.string().nullish(),
    city: z.string().nullish(),
    state: z.string().nullish(),
    country: z.string().nullish(),
    title: z.string().nullish(),
    owner: z
      .object({
        id: z.number(),
      })

      .nullish(),
    account: z
      .object({
        id: z.number(),
      })

      .nullish(),
    phone: z.string().nullish(),
    home_phone: z.string().nullish(),
    mobile_phone: z.string().nullish(),
    email_address: z.string().nullish(),
    secondary_email_address: z.string().nullish(),
    personal_email_address: z.string().nullish(),
    created_at: custom.date(),
    updated_at: custom.date(),
    counts: z.object({
      emails_sent: z.number().nullish(),
      emails_viewed: z.number().nullish(),
      emails_clicked: z.number().nullish(),
      emails_replied_to: z.number().nullish(),
      emails_bounced: z.number().nullish(),
      calls: z.number().nullish(),
    }),
    custom_fields: z.record(z.any()),
  }),
);

export type SalesloftPerson = z.infer<typeof salesloftPerson>;

export type SalesloftPersonCreate = {
  first_name?: string | null;
  last_name?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  title?: string | null;
  owner?: { id: string } | null;
  account?: { id: string } | null;
  email_address?: string | null;
  secondary_email_address?: string | null;
  personal_email_address?: string | null;
  custom_fields?: Record<string, any>;
  $native?: Record<string, unknown>;
};

export type SalesloftPersonUpdate = {
  first_name?: string | null;
  last_name?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  title?: string | null;
  owner?: { id: string } | null;
  account?: { id: string } | null;
  email_address?: string | null;
  secondary_email_address?: string | null;
  personal_email_address?: string | null;
  custom_fields?: Record<string, any>;
  $native?: Record<string, unknown>;
};

export const salesloftUser = custom.addNativeToZodSchema(
  z.object({
    id: z.number(),
    guid: z.string(),
    created_at: custom.date(),
    updated_at: custom.date(),
    first_name: z.string().nullish(),
    name: z.string().nullish(),
    last_name: z.string().nullish(),
    job_role: z.string().nullish(),
    active: z.boolean(),
    time_zone: z.string().nullish(),
    slack_username: z.string().nullish(),
    twitter_handle: z.string().nullish(),
    email: z.string().nullish(),
    email_client_email_address: z.string().nullish(),
    sending_email_address: z.string().nullish(),
    from_address: z.string().nullish(),
    full_email_address: z.string().nullish(),
    bcc_email_address: z.string().nullish(),
    work_country: z.string().nullish(),
    email_signature: z.string().nullish(),
    email_signature_type: z.string().nullish(),
    email_signature_click_tracking_disabled: z.boolean().nullish(),
    team_admin: z.boolean().nullish(),
    local_dial_enabled: z.boolean().nullish(),
    click_to_call_enabled: z.boolean().nullish(),
    email_client_configured: z.boolean().nullish(),
    crm_connected: z.boolean().nullish(),
  }),
);

export type SalesloftUser = z.infer<typeof salesloftUser>;

export const salesloftCadence = custom.addNativeToZodSchema(
  z.object({
    id: z.number(),
    created_at: custom.date(),
    updated_at: custom.date(),
    name: z.string().nullish(),
    archived_at: z.string().nullish(),
    team_cadence: z.boolean().nullish(),
    shared: z.boolean().nullish(),
    remove_bounces_enabled: z.boolean().nullish(),
    remove_replies_enabled: z.boolean().nullish(),
    opt_out_link_included: z.boolean().nullish(),
    draft: z.boolean().nullish(),
    cadence_framework_id: z.number().nullish(),
    cadence_function: z.string().nullish(),
    external_identifier: z.string().nullish(),
    tags: z.array(z.string()),
    counts: z
      .object({
        cadence_people: z.number().nullish(),
        people_acted_on_count: z.number().nullish(),
        target_daily_people: z.number().nullish(),
        opportunities_created: z.number().nullish(),
        meetings_booked: z.number().nullish(),
      })

      .nullish(),
  }),
);

export type SalesloftCadence = z.infer<typeof salesloftCadence>;

export const salesloftCadenceMembership = custom.addNativeToZodSchema(
  z.object({
    id: z.number(),
    added_at: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    person_deleted: z.boolean().nullish(),
    currently_on_cadence: z.boolean().nullish(),
    current_state: z.string().nullish(),
    cadence: z.object({
      id: z.number(),
    }),
    person: z
      .object({
        id: z.number(),
      })

      .nullish(),
    user: z
      .object({
        id: z.number(),
      })

      .nullish(),
    latest_action: z
      .object({
        id: z.number(),
      })

      .nullish(),
    counts: z
      .object({
        views: z.number().nullish(),
        clicks: z.number().nullish(),
        replies: z.number().nullish(),
        calls: z.number().nullish(),
        sent_emails: z.number().nullish(),
        bounces: z.number().nullish(),
      })

      .nullish(),
  }),
);

export type SalesloftCadenceMembership = z.infer<
  typeof salesloftCadenceMembership
>;

/**
 * Incomplete, just the properties we need to enable our current emails API.
 * See here for a full list of properties:
 * https://developers.salesloft.com/cadence-imports.html#type-settings-email
 */
export type SalesloftCadenceImport = {
  settings?: {
    name: string;
    target_daily_people: number;
    remove_replied: boolean;
    remove_bounced: boolean;
    external_identifier: string | null;
    cadence_function: string;
  };
  sharing_settings?: {
    team_cadence: boolean;
    shared: boolean;
  };
  cadence_content?: {
    cadence_id: string;
    step_groups: {
      day: number;
      due_immediately: boolean;
      automated: boolean;
      reference_id?: number;
      steps: {
        enabled: boolean;
        name?: string;
        type: string;
        type_settings: {
          previous_email_step_group_reference_id?: number;
          email_template: {
            title: string;
            subject?: string;
            body: string;
            open_tracking?: boolean;
            click_tracking?: boolean;
          };
        };
      }[];
    }[];
  };
};

export const salesloftCadenceImportResponse = custom.addNativeToZodSchema(
  z.object({
    data: z.object({
      cadence: z.object({
        id: z.number(),
      }),
    }),
  }),
);

export const salesloftEmail = custom.addNativeToZodSchema(
  z.object({
    id: z.number(),
    created_at: custom.date(),
    updated_at: custom.date(),
    recipient_email_address: z.string().nullish(),
    status: z.string().nullish(),
    bounced: z.boolean(),
    send_after: custom.date(),
    sent_at: custom.date(),
    view_tracking: z.boolean(),
    click_tracking: z.boolean(),
    subject: z.string().nullish(),
    error_message: z.string().nullish(),
    counts: z
      .object({
        clicks: z.number().nullish(),
        views: z.number().nullish(),
        replies: z.number().nullish(),
        unique_devices: z.number().nullish(),
        unique_locations: z.number().nullish(),
        attachments: z.number().nullish(),
      })

      .nullish(),
    user: z
      .object({
        id: z.number(),
      })

      .nullish(),
    cadence: z
      .object({
        id: z.number(),
      })

      .nullish(),
  }),
);

export type SalesloftEmail = z.infer<typeof salesloftEmail>;

export const salesloftEmailBody = custom.addNativeToZodSchema(
  z.object({
    id: z.number(),
    mailbox: z.string().nullish(),
    message_id: z.string().nullish(),
    raw: z.string(),
  }),
);

export type SalesloftEmailBody = z.infer<typeof salesloftEmailBody>;

export const salesloftCustomField = z.object({
  id: z.number(),
  name: z.string(),
  field_type: z.string(),
  value_type: z.string(),
  created_at: custom.date(),
  updated_at: custom.date(),
});

export type SalesloftCustomField = z.infer<typeof salesloftCustomField>;

export type SalesloftCustomFieldCreate = {
  name: string;
  field_type: string;
  $native?: Record<string, unknown>;
};

export const salesloftTag = custom.addNativeToZodSchema(
  z.object({
    id: z.number(),
    name: z.string(),
  }),
);

export type SalesloftTag = z.infer<typeof salesloftTag>;

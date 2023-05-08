import * as custom from '@/sdk/validators';
import { z } from 'zod';
import { HUBSPOT_COMMON_ASSOCIATIONS } from './constants';

export const hubspotCommonAssociationsSchema = z.enum(
  HUBSPOT_COMMON_ASSOCIATIONS,
);
export type HubspotCommonAssociations =
  (typeof HUBSPOT_COMMON_ASSOCIATIONS)[number];

export const HUBSPOT_TASK_STATUS_COMPLETED = 'COMPLETED';

// -
// Client Definitions
// -
export type FindObjectInput = {
  id: string;
  associations?: HubspotCommonAssociations[];
};
export type ListObjectInput = {
  after?: string;
  pageSize?: number;
  associations?: HubspotCommonAssociations[];
};
export type BatchReadObjectInput = {
  ids: string[];
};
export type ListOutput<T> = {
  results?: T[];
  paging?: {
    next?: {
      after: string;
    };
  };
};
export const listResponseSchema = (itemSchema: z.ZodSchema) =>
  z
    .object({
      results: z.array(itemSchema).optional(),
      paging: z
        .object({
          next: z
            .object({
              after: z.string().optional(),
            })
            .passthrough()
            .optional(),
        })
        .passthrough()
        .optional(),
    })
    .passthrough();

export const HUBSPOT_MODULES = [
  'owners',
  'contacts',
  'deals',
  'companies',
  'notes',
  'tasks',
  'meetings',
  'emails',
  'calls',
  'contact_lists',
] as const;
export const hubspotModuleSchema = z.enum(HUBSPOT_MODULES);
export type HubspotModule = (typeof HUBSPOT_MODULES)[number];

export const hubspotAssociationSchema = z
  .object({
    results: z.array(
      z
        .object({
          id: z.string(),
          type: z.string(),
        })
        .passthrough(),
    ),
  })
  .passthrough();

export const hubspotIdSchema = z.union([z.string(), z.number()]);
const hubspotBooleanSchema = z
  .union([z.enum(['true', 'false', '']), z.boolean()])
  .transform((val) => {
    if (val === 'true') return true;
    if (val === 'false') return false;
    if (val === '') return undefined;
    return val;
  });

export const baseHubspotObjectSchema = <T extends z.ZodSchema>(properties: T) =>
  z
    .object({
      id: hubspotIdSchema,
      createdAt: z.string().transform((val) => new Date(val)),
      updatedAt: z.string().transform((val) => new Date(val)),
      properties: properties,
      associations: z
        .object({
          companies: hubspotAssociationSchema,
          contacts: hubspotAssociationSchema,
          deals: hubspotAssociationSchema,
        })
        .partial()
        .passthrough(),
    })
    .passthrough();

// -
// Owners
// -
export const hubspotOwnerSchema = z
  .object({
    id: hubspotIdSchema,
    createdAt: z.string().transform((val) => new Date(val)),
    updatedAt: z.string().transform((val) => new Date(val)),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
  })
  .passthrough();
export type HubspotOwner = z.infer<typeof hubspotOwnerSchema>;

// -
// Contacts
// -
const contactPropertiesSchema = z
  .object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.string(),
    jobtitle: z.string(),
    phone: z.string(),
    mobilephone: z.string(),
    hs_lead_status: z.string(),
    company: z.string(),
    hubspot_owner_id: z.string(),
  })
  .partial()
  .passthrough();
export const contactProperties = Object.keys(contactPropertiesSchema.shape);

export const hubspotContactSchema = baseHubspotObjectSchema<
  typeof contactPropertiesSchema
>(contactPropertiesSchema);
export type HubspotContact = z.infer<typeof hubspotContactSchema>;

export const hubspotContactUpsertSchema = z
  .object({
    email: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    phone: z.string(),
    jobtitle: z.string(),
    mobilephone: z.string(),
    company: z.string().optional(),
    hubspot_owner_id: z.string().optional(),
  })
  .partial()
  .passthrough();
export type HubspotContactCreate = z.infer<typeof hubspotContactUpsertSchema>;
export type HubspotContactUpdate = z.infer<
  typeof hubspotContactUpsertSchema
> & { id: string };

// -
// Deals
// -
const dealPropertiesSchema = z
  .object({
    amount: z.union([z.string(), z.number()]),
    dealname: z.string(),
    closedate: z.string().transform((val) => new Date(val)),
    dealstage: z.string(),
    hs_deal_stage_probability: z.union([z.string(), z.number()]),
    hs_projected_amount: z.union([z.string(), z.number()]),
    hs_is_closed_won: hubspotBooleanSchema,
    hs_is_closed: hubspotBooleanSchema,
    hubspot_owner_id: z.string(),
  })
  .partial()
  .passthrough();
export const dealProperties = Object.keys(dealPropertiesSchema.shape);

export const hubspotDealSchema =
  baseHubspotObjectSchema<typeof dealPropertiesSchema>(dealPropertiesSchema);
export type HubspotDeal = z.infer<typeof hubspotDealSchema>;

export const hubspotDealUpsertSchema = z
  .object({
    dealname: z.string(),
    amount: z.string(),
    closedate: custom.date(),
    hs_deal_stage_probability: z.string(),
    dealstage: z.string().optional(),
  })
  .partial();
export type HubspotDealCreate = z.infer<typeof hubspotDealUpsertSchema>;
export type HubspotDealUpdate = z.infer<typeof hubspotDealUpsertSchema> & {
  id: string;
};

// -
// Companies
// -
const companyPropertiesSchema = z
  .object({
    name: z.string(),
    website: z.string(),
    industry: z.string(),
    phone: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
    country: z.string(),
    numberofemployees: z.union([z.string(), z.number()]),
    annualrevenue: z.union([z.string(), z.number()]),
    description: z.string(),
    hubspot_owner_id: z.string(),
  })
  .partial()
  .passthrough();
export const companyProperties = Object.keys(companyPropertiesSchema.shape);

export const hubspotCompanySchema = baseHubspotObjectSchema<
  typeof companyPropertiesSchema
>(companyPropertiesSchema);
export type HubspotCompany = z.infer<typeof hubspotCompanySchema>;

export const hubspotCompanyUpsertSchema = z
  .object({
    name: z.string(),
    website: z.string(),
    industry: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
    country: z.string(),
    numberofemployees: z.string(),
    annualrevenue: z.string(),
    description: z.string(),
    phone: z.string(),
    hubspot_owner_id: z.string(),
  })
  .partial();
export type HubspotCompanyCreate = z.infer<typeof hubspotCompanyUpsertSchema>;
export type HubspotCompanyUpdate = z.infer<
  typeof hubspotCompanyUpsertSchema
> & { id: string };

// -
// Notes
// -
const notePropertiesSchema = z
  .object({
    hubspot_owner_id: hubspotIdSchema,
    hs_note_body: z.string(),
  })
  .partial()
  .passthrough();
export const noteProperties = Object.keys(notePropertiesSchema.shape);

export const hubspotNoteSchema =
  baseHubspotObjectSchema<typeof notePropertiesSchema>(notePropertiesSchema);
export type HubspotNote = z.infer<typeof hubspotNoteSchema>;

export const hubspotNoteUpsertSchema = z
  .object({
    hs_note_body: z.string(),
    hubspot_owner_id: z.string(),
    hs_timestamp: z.string().optional(),
  })
  .partial();
export type HubspotNoteUpdate = z.infer<typeof hubspotNoteUpsertSchema> & {
  id: string;
};
export type HubspotNoteCreate = z.infer<typeof hubspotNoteUpsertSchema>;

// -
// Tasks
// -
const taskPropertiesSchema = z
  .object({
    hs_task_body: z.string(),
    hs_task_subject: z.string(),
    hs_task_status: z.string(),
    hs_timestamp: z.string().transform((val) => new Date(val)),
    hs_task_priority: z.string(),
    hubspot_owner_id: hubspotIdSchema,
  })
  .partial()
  .passthrough();
export const taskProperties = Object.keys(taskPropertiesSchema.shape);

export const hubspotTaskSchema =
  baseHubspotObjectSchema<typeof taskPropertiesSchema>(taskPropertiesSchema);
export type HubspotTask = z.infer<typeof hubspotTaskSchema>;

export const hubspotTaskUpsertSchema = z
  .object({
    hs_task_body: z.string(),
    hs_task_subject: z.string(),
    hs_task_status: z.string(),
    hs_task_priority: z.string(),
    hs_timestamp: z.string().optional(),
    hubspot_owner_id: z.string(),
  })
  .partial();
export type HubspotTaskUpdate = z.infer<typeof hubspotTaskUpsertSchema> & {
  id: string;
};
export type HubspotTaskCreate = z.infer<typeof hubspotTaskUpsertSchema>;

// -
// Meetings
// -
const meetingPropertiesSchema = z
  .object({
    hs_timestamp: custom.date(),
    hs_meeting_title: z.string(),
    hs_meeting_body: z.string(),
    hs_meeting_location: z.string(),
    hs_meeting_start_time: custom.date().optional(),
    hs_meeting_end_time: custom.date().optional(),
    hubspot_owner_id: hubspotIdSchema,
  })
  .partial()
  .passthrough();
export const meetingProperties = Object.keys(meetingPropertiesSchema.shape);

export const hubspotMeetingSchema = baseHubspotObjectSchema<
  typeof meetingPropertiesSchema
>(meetingPropertiesSchema);
export type HubspotMeeting = z.infer<typeof hubspotMeetingSchema>;

export const hubspotMeetingUpsertSchema = z
  .object({
    hs_timestamp: z.string().optional(),
    hs_meeting_title: z.string(),
    hs_meeting_body: z.string(),
    hs_meeting_location: z.string(),
    hs_meeting_start_time: z.string(),
    hs_meeting_end_time: z.string(),
    hubspot_owner_id: z.string(),
  })
  .partial();
export type HubspotMeetingUpdate = z.infer<
  typeof hubspotMeetingUpsertSchema
> & { id: string };
export type HubspotMeetingCreate = z.infer<typeof hubspotMeetingUpsertSchema>;

// -
// Emails
// -
export const hubspotEmailDirectionSchema = z.enum([
  'INCOMING_EMAIL',
  'FORWARDED_EMAIL',
  'EMAIL',
]);

const emailPropertiesSchema = z
  .object({
    hs_email_from_email: z.string(),
    hs_email_to_email: z.string(),
    hs_email_cc_email: z.string(),
    hs_email_bcc_email: z.string(),
    hs_email_html: z.string(),
    hs_email_text: z.string(),
    hs_email_direction: hubspotEmailDirectionSchema,
    hs_email_subject: z.string(),
    hs_email_bounce_error_detail_status_code: z.number(),
    hs_attachment_ids: z.array(hubspotIdSchema),
    hs_timestamp: z.string().transform((val) => new Date(val)),
    hs_email_status: z.string(),
    hubspot_owner_id: hubspotIdSchema,
  })
  .partial()
  .passthrough();
export const emailProperties = Object.keys(emailPropertiesSchema.shape);

export const hubspotEmailSchema = baseHubspotObjectSchema<
  typeof emailPropertiesSchema
>(emailPropertiesSchema);
export type HubspotEmail = z.infer<typeof hubspotEmailSchema>;

export const hubspotEmailCreateSchema = emailPropertiesSchema
  .pick({
    hs_email_html: true,
    hs_email_text: true,
    hs_email_subject: true,
    hs_email_status: true,
    hs_timestamp: true,
    hs_email_direction: true,
    hubspot_owner_id: true,
  })
  .partial()
  .extend({
    hs_email_headers: z.string(), // json
  });

export type HubspotEmailCreate = z.infer<typeof hubspotEmailCreateSchema>;

export const hubspotEmailUpdateSchema = emailPropertiesSchema
  .pick({
    hs_email_direction: true,
    hs_email_status: true,
    hubspot_owner_id: true,
  })
  .partial();
export type HubspotEmailUpdate = z.infer<typeof hubspotEmailUpdateSchema> & {
  id: string;
};

// -
// Calls
// -
export const callDispositionsSchema = z.array(
  z.object({
    label: z.string(),
    id: z.string(),
  }),
);

const callPropertiesSchema = z
  .object({
    hs_call_disposition: z.string(),
    hs_call_direction: z.union([z.literal('INBOUND'), z.literal('OUTBOUND')]),
    hs_timestamp: z.string().transform((val) => new Date(val)),
    hs_call_body: z.string(),
    hs_call_title: z.string(),
    hubspot_owner_id: hubspotIdSchema,
  })
  .partial()
  .passthrough();
export const callProperties = Object.keys(callPropertiesSchema.shape);

export const hubspotCallSchema =
  baseHubspotObjectSchema<typeof callPropertiesSchema>(callPropertiesSchema);
export type HubspotCall = z.infer<typeof hubspotCallSchema>;

export const hubspotCallCreateSchema = callPropertiesSchema
  .pick({
    hs_call_disposition: true,
    hs_call_direction: true,
    hs_call_body: true,
    hs_call_title: true,
    hubspot_owner_id: true,
    hs_timestamp: true,
  })
  .partial();
export type HubspotCallCreate = z.infer<typeof hubspotCallCreateSchema>;

export const hubspotCallUpdateSchema = callPropertiesSchema
  .pick({
    hs_call_disposition: true,
    hubspot_owner_id: true,
  })
  .partial();
export type HubspotCallUpdate = z.infer<typeof hubspotCallUpdateSchema> & {
  id: string;
};

// -
// Contact Lists
// -
export const hubspotContactListSchema = z
  .object({
    listId: hubspotIdSchema,
    name: z.string(),
    dynamic: z.boolean(),
    createdAt: z.number().transform((val) => new Date(val)),
    updatedAt: z.number().transform((val) => new Date(val)),
  })
  .passthrough();
export type HubspotContactList = z.infer<typeof hubspotContactListSchema>;
export const listResponseHubspotContactListSchema = z
  .object({
    lists: z.array(hubspotContactListSchema),
    'has-more': z.boolean(),
    offset: z.number(),
  })
  .passthrough();
export type ListResponseHubspotContactList = z.infer<
  typeof listResponseHubspotContactListSchema
>;

export const hubspotContactListContactsSchema = hubspotContactSchema
  .omit({ id: true })
  .extend({
    vid: hubspotIdSchema,
  })
  .passthrough();
export type HubspotContactListContact = z.infer<
  typeof hubspotContactListContactsSchema
>;
export const listResponseHubspotContactListContactsSchema = z
  .object({
    contacts: z.array(hubspotContactListContactsSchema),
    'has-more': z.boolean(),
    'vid-offset': z.number(),
  })
  .passthrough();
export type ListResponseHubspotContactListContacts = z.infer<
  typeof listResponseHubspotContactListContactsSchema
>;

// -
// Properties
// -
export const hubspotPropertyTypeSchema = z.enum([
  'bool',
  'string',
  'number',
  'date',
  'datetime',
  'enumeration',
  'json',
  'phone_number',
  'object_coordinates',
]);
export type HubspotPropertyType = z.infer<typeof hubspotPropertyTypeSchema>;

export const hubspotPropertyFieldTypeSchema = z.enum([
  'textarea',
  'text',
  'date',
  'file',
  'number',
  'select',
  'radio',
  'checkbox',
  'datetime',
  'booleancheckbox',
]);

export const hubspotPropertyOptionSchema = z.object({
  label: z.string(),
  value: z.any(),
  description: z.string().nullable(),
  displayOrder: z.number().nullable(),
  hidden: z.boolean(),
});

export const hubspotCustomPropertySchema = z.object({
  name: z.string(),
  label: z.string(),
  type: hubspotPropertyTypeSchema,
  fieldType: hubspotPropertyFieldTypeSchema,
  groupName: z.string(),
  options: z.array(hubspotPropertyOptionSchema).optional(),
});
export const hubspotCustomPropertyCreateSchema = z.object({
  objectType: hubspotModuleSchema,
  property: hubspotCustomPropertySchema,
});
export type HubspotCustomPropertyCreate = z.infer<
  typeof hubspotCustomPropertyCreateSchema
>;

export const hubspotPropertySchema = z
  .object({
    name: z.string(),
    label: z.string(),
    type: hubspotPropertyTypeSchema,
    fieldType: hubspotPropertyFieldTypeSchema,
    hubspotDefined: z.boolean(),
    options: z.array(hubspotPropertyOptionSchema).optional(),
    modificationMetadata: z.object({
      readOnlyValue: z.boolean(),
    }),
  })
  .passthrough();
export type HubspotProperty = z.infer<typeof hubspotPropertySchema>;

// -
// Associations
// -
export const hubspotAssociationCreateSchema = z.object({
  fromId: hubspotIdSchema,
  fromType: hubspotModuleSchema,
  toId: hubspotIdSchema,
  toType: hubspotModuleSchema,
  category: z.string().optional(),
  typeId: hubspotIdSchema.optional(),
});
export type HubspotAssociationCreate = z.infer<
  typeof hubspotAssociationCreateSchema
>;
export const hubspotAssociationResponseSchema = z
  .object({
    from: z.object({
      id: hubspotIdSchema,
    }),
    to: z.object({
      id: hubspotIdSchema,
    }),
    associationSpec: z
      .object({
        associationCategory: z.string(),
        associationTypeId: hubspotIdSchema,
      })
      .passthrough(),
  })
  .passthrough();
export type HubspotAssociationResponse = z.infer<
  typeof hubspotAssociationResponseSchema
>;
export const hubspotAssociationLabelInputSchema = z.object({
  fromType: hubspotModuleSchema,
  toType: hubspotModuleSchema,
});
export type HubspotAssociationLabelInput = z.infer<
  typeof hubspotAssociationLabelInputSchema
>;
export const hubspotAssociationLabelOutputSchema = z
  .object({
    category: z.string(),
    typeId: hubspotIdSchema,
  })
  .passthrough();
export type HubspotAssociationLabelOutput = z.infer<
  typeof hubspotAssociationLabelOutputSchema
>;
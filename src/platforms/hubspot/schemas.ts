import * as custom from '@/sdk/validators';
import { z } from 'zod';
import {
  HUBSPOT_COMMON_ASSOCIATIONS,
  HUBSPOT_MODULES,
  HUBSPOT_PROPERTY_FIELD_TYPES,
  HUBSPOT_PROPERTY_TYPES,
} from './constants';

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
  limit?: number;
  associations?: HubspotCommonAssociations[];
};
export type BatchReadObjectInput = {
  ids: string[];
} & ListObjectInput;
export type SearchOperator =
  | 'LT'
  | 'LTE'
  | 'GT'
  | 'GTE'
  | 'EQ'
  | 'NEQ'
  | 'BETWEEN'
  | 'IN'
  | 'NOT_IN'
  | 'HAS_PROPERTY'
  | 'NOT_HAS_PROPERTY'
  | 'CONTAINS_TOKEN'
  | 'NOT_CONTAINS_TOKEN';
export type SearchObjectInput = {
  filterGroups: {
    filters: {
      propertyName: string;
      operator: SearchOperator;
      value?: string;
      values?: string[];
      highValue?: string;
    }[];
  }[];
} & ListObjectInput;
export type ListOutput<T> = {
  results?: T[];
  paging?: {
    next?: {
      after: string;
    };
  };
};
export const listResponseSchema = (itemSchema: z.ZodSchema) =>
  z.object({
    results: z.array(itemSchema).optional(),
    paging: z
      .object({
        next: z
          .object({
            after: z.string().optional(),
          })
          .optional(),
      })
      .optional(),
  });

export const hubspotModuleSchema = z.enum(HUBSPOT_MODULES);
export type HubspotModule = (typeof HUBSPOT_MODULES)[number];

export const hubspotAssociationSchema = z.object({
  results: z.array(
    z.object({
      id: z.string(),
      type: z.string(),
    }),
  ),
});

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
  z.object({
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
      .optional(),
  });

export const upsertResponseSchema = z.object({
  id: hubspotIdSchema,
});

// -
// Owners
// -
export const hubspotOwnerSchema = z.object({
  id: hubspotIdSchema,
  createdAt: z.string().transform((val) => new Date(val)),
  updatedAt: z.string().transform((val) => new Date(val)),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  email: z.string().nullable(),
});
export type HubspotOwner = z.infer<typeof hubspotOwnerSchema>;

// -
// Contacts
// -
const contactPropertiesSchema = z.object({
  firstname: z.string().nullable(),
  lastname: z.string().nullable(),
  email: z.string().nullable(),
  jobtitle: z.string().nullable(),
  phone: z.string().nullable(),
  mobilephone: z.string().nullable(),
  hs_lead_status: z.string().nullable(),
  company: z.string().nullable(),
  hubspot_owner_id: z.string().nullable(),
  hs_all_contact_vids: z.string().nullable(),
});
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
    $native: z.record(z.any()),
  })
  .partial();
export type HubspotContactCreate = z.infer<typeof hubspotContactUpsertSchema>;
export type HubspotContactUpdate = z.infer<
  typeof hubspotContactUpsertSchema
> & { id: string };

// -
// Deals
// -
const dealPropertiesSchema = z.object({
  amount: z.union([z.string(), z.number()]).nullable(),
  dealname: z.string().nullable(),
  closedate: z
    .string()
    .transform((val) => new Date(val))
    .nullable(),
  dealstage: z.string().nullable(),
  hs_deal_stage_probability: z.union([z.string(), z.number()]).nullable(),
  hs_projected_amount: z.union([z.string(), z.number()]).nullable(),
  hs_is_closed_won: hubspotBooleanSchema.nullable(),
  hs_is_closed: hubspotBooleanSchema.nullable(),
  hubspot_owner_id: z.string().nullable(),
  hs_merged_object_ids: z.string().nullable(),
});
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
    $native: z.record(z.any()),
  })
  .partial();
export type HubspotDealCreate = z.infer<typeof hubspotDealUpsertSchema>;
export type HubspotDealUpdate = z.infer<typeof hubspotDealUpsertSchema> & {
  id: string;
};

// -
// Companies
// -
const companyPropertiesSchema = z.object({
  name: z.string().nullable(),
  website: z.string().nullable(),
  industry: z.string().nullable(),
  phone: z.string().nullable(),
  address: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  zip: z.string().nullable(),
  country: z.string().nullable(),
  numberofemployees: z.union([z.string(), z.number()]).nullable(),
  annualrevenue: z.union([z.string(), z.number()]).nullable(),
  description: z.string().nullable(),
  hubspot_owner_id: z.string().nullable(),
  hs_merged_object_ids: z.string().nullable(),
});
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
    $native: z.record(z.any()),
  })
  .partial();
export type HubspotCompanyCreate = z.infer<typeof hubspotCompanyUpsertSchema>;
export type HubspotCompanyUpdate = z.infer<
  typeof hubspotCompanyUpsertSchema
> & { id: string };

// -
// Notes
// -
const notePropertiesSchema = z.object({
  hubspot_owner_id: hubspotIdSchema.nullable(),
  hs_note_body: z.string().nullable(),
  hs_timestamp: z.string().nullable(),
});
export const noteProperties = Object.keys(notePropertiesSchema.shape);

export const hubspotNoteSchema =
  baseHubspotObjectSchema<typeof notePropertiesSchema>(notePropertiesSchema);
export type HubspotNote = z.infer<typeof hubspotNoteSchema>;

export const hubspotNoteUpsertSchema = z
  .object({
    hs_note_body: z.string(),
    hubspot_owner_id: z.string(),
    hs_timestamp: z.string().optional(),
    $native: z.record(z.any()),
  })
  .partial();
export type HubspotNoteUpdate = z.infer<typeof hubspotNoteUpsertSchema> & {
  id: string;
};
export type HubspotNoteCreate = z.infer<typeof hubspotNoteUpsertSchema>;

// -
// Tasks
// -
const taskPropertiesSchema = z.object({
  hs_task_body: z.string().nullable(),
  hs_task_subject: z.string().nullable(),
  hs_task_status: z.string().nullable(),
  hs_task_type: z.string().nullable(),
  hs_timestamp: z
    .string()
    .transform((val) => new Date(val))
    .nullable(),
  hs_task_priority: z.string().nullable(),
  hubspot_owner_id: hubspotIdSchema.nullable(),
});
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
    $native: z.record(z.any()),
  })
  .partial();
export type HubspotTaskUpdate = z.infer<typeof hubspotTaskUpsertSchema> & {
  id: string;
};
export type HubspotTaskCreate = z.infer<typeof hubspotTaskUpsertSchema>;

// -
// Meetings
// -
const meetingPropertiesSchema = z.object({
  hs_timestamp: custom.date().nullable(),
  hs_meeting_title: z.string().nullable(),
  hs_meeting_body: z.string().nullable(),
  hs_meeting_location: z.string().nullable(),
  hs_meeting_start_time: custom.date().nullable(),
  hs_meeting_end_time: custom.date().nullable(),
  hubspot_owner_id: hubspotIdSchema.nullable(),
});
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
    $native: z.record(z.any()),
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

const emailPropertiesSchema = z.object({
  hs_email_from_email: z.string().nullable(),
  hs_email_to_email: z.string().nullable(),
  hs_email_cc_email: z.string().nullable(),
  hs_email_bcc_email: z.string().nullable(),
  hs_email_html: z.string().nullable(),
  hs_email_text: z.string().nullable(),
  hs_email_direction: hubspotEmailDirectionSchema.nullable(),
  hs_email_subject: z.string().nullable(),
  hs_email_bounce_error_detail_status_code: z.number().nullable(),
  hs_attachment_ids: z.array(hubspotIdSchema).nullable(),
  hs_timestamp: z
    .string()
    .transform((val) => new Date(val))
    .nullable(),
  hs_email_status: z.string().nullable(),
  hubspot_owner_id: hubspotIdSchema.nullable(),
});
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
    $native: z.record(z.any()).optional(),
  });

export type HubspotEmailCreate = z.infer<typeof hubspotEmailCreateSchema>;

export const hubspotEmailUpdateSchema = emailPropertiesSchema
  .pick({
    hs_email_direction: true,
    hs_email_status: true,
    hubspot_owner_id: true,
  })
  .partial()
  .extend({
    $native: z.record(z.any()).optional(),
  });
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

const callPropertiesSchema = z.object({
  hs_call_disposition: z.string().nullable(),
  hs_call_direction: z
    .union([z.literal('INBOUND'), z.literal('OUTBOUND')])
    .nullable(),
  hs_timestamp: z
    .string()
    .transform((val) => new Date(val))
    .nullable(),
  hs_call_body: z.string().nullable(),
  hs_call_title: z.string().nullable(),
  hubspot_owner_id: hubspotIdSchema.nullable(),
});
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
  .partial()
  .extend({
    $native: z.record(z.any()).optional(),
  });
export type HubspotCallCreate = z.infer<typeof hubspotCallCreateSchema>;

export const hubspotCallUpdateSchema = callPropertiesSchema
  .pick({
    hs_call_disposition: true,
    hubspot_owner_id: true,
  })
  .partial()
  .extend({
    $native: z.record(z.any()).optional(),
  });
export type HubspotCallUpdate = z.infer<typeof hubspotCallUpdateSchema> & {
  id: string;
};

// -
// Contact Lists
// -
export const hubspotContactListSchema = z.object({
  listId: hubspotIdSchema,
  name: z.string().nullable(),
  dynamic: z.boolean(),
  createdAt: z.number().transform((val) => new Date(val)),
  updatedAt: z.number().transform((val) => new Date(val)),
});
export type HubspotContactList = z.infer<typeof hubspotContactListSchema>;
export const listResponseHubspotContactListSchema = z.object({
  lists: z.array(hubspotContactListSchema),
  'has-more': z.boolean(),
  offset: z.number(),
});
export type ListResponseHubspotContactList = z.infer<
  typeof listResponseHubspotContactListSchema
>;

export const hubspotContactListContactsSchema = z.object({
  vid: hubspotIdSchema,
});
export type HubspotContactListContact = z.infer<
  typeof hubspotContactListContactsSchema
>;
export const listResponseHubspotContactListContactsSchema = z.object({
  contacts: z.array(hubspotContactListContactsSchema),
  'has-more': z.boolean(),
  'vid-offset': z.number(),
});
export type ListResponseHubspotContactListContacts = z.infer<
  typeof listResponseHubspotContactListContactsSchema
>;

// -
// Properties
// -
export const hubspotPropertyTypeSchema = z.enum(HUBSPOT_PROPERTY_TYPES);
export type HubspotPropertyType = (typeof HUBSPOT_PROPERTY_TYPES)[number];

export const hubspotPropertyFieldTypeSchema = z.enum(
  HUBSPOT_PROPERTY_FIELD_TYPES,
);
export type HubspotPropertyFieldType =
  (typeof HUBSPOT_PROPERTY_FIELD_TYPES)[number];

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
  $native: z.record(z.any()).optional(),
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
    type: z.string().transform((v) => v as HubspotPropertyType),
    fieldType: z.string().transform((v) => v as HubspotPropertyFieldType),
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
export const hubspotAssociationResponseSchema = z.object({
  from: z.object({
    id: hubspotIdSchema,
  }),
  to: z.object({
    id: hubspotIdSchema,
  }),
  associationSpec: z.object({
    associationCategory: z.string(),
    associationTypeId: hubspotIdSchema,
  }),
});
export type HubspotAssociationResponse = z.infer<
  typeof hubspotAssociationResponseSchema
>;

export const hubspotAssociationDeleteSchema = z.object({
  fromId: hubspotIdSchema,
  fromType: hubspotModuleSchema,
  toId: hubspotIdSchema,
  toType: hubspotModuleSchema,
});
export type HubspotAssociationDelete = z.infer<
  typeof hubspotAssociationDeleteSchema
>;

export const hubspotAssociationLabelInputSchema = z.object({
  fromType: hubspotModuleSchema,
  toType: hubspotModuleSchema,
});
export type HubspotAssociationLabelInput = z.infer<
  typeof hubspotAssociationLabelInputSchema
>;
export const hubspotAssociationLabelOutputSchema = z.object({
  category: z.string(),
  typeId: hubspotIdSchema,
});
export type HubspotAssociationLabelOutput = z.infer<
  typeof hubspotAssociationLabelOutputSchema
>;

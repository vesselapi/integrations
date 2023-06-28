import { HttpsUrl } from '@/sdk';
import * as validators from '@/sdk/validators';
import { z } from 'zod';
import {
  SALESFORCE_CALL_TYPES,
  SALESFORCE_FIELD_TYPES,
  SALESFORCE_JOB_STATES,
  SALESFORCE_SUPPORTED_OBJECT_TYPE,
} from './constants';

const requiredFields = {
  Id: true,
  CreatedDate: true,
  LastModifiedDate: true,
} as const;

// -
// SObjects
// -
export const salesforceSupportedObjectType = z.enum(
  SALESFORCE_SUPPORTED_OBJECT_TYPE,
);
export const salesforceSObject = validators.object({
  sobjects: z.array(z.object({ name: z.string() })),
});

// -
// SObject Describe
//  -
export type SalesforceFieldType = (typeof SALESFORCE_FIELD_TYPES)[number];
export const salesforceField = validators.object({
  name: z.string(),
  label: z.string(),
  type: z.string().transform((v) => v as SalesforceFieldType),
  custom: z.boolean(),
  createable: z.boolean(),
  updateable: z.boolean(),
  picklistValues: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
        active: z.boolean(),
      }),
    )
    .optional(),
  defaultedOnCreate: z.boolean(),
  nillable: z.boolean(), // field can be null
});

export const salesforceDescribeResponse = validators.object({
  fields: z.array(salesforceField),
});

// -
// Query
// -
export const salesforceQueryResponse = validators.object({
  records: z.array(
    z
      .object({
        Id: z.string(),
      })
      .passthrough(),
  ),
  totalSize: z.number(),
});

// -
// Jobs
// -
export type SalesforceJobState = (typeof SALESFORCE_JOB_STATES)[number];
export const salesforceJob = validators.object({
  id: z.string(),
  operation: z.string(),
  object: z.string().transform((v) => v as SalesforceSupportedObjectType),
  createdById: z.string(),
  createdDate: validators.date(),
  systemModstamp: validators.date(),
  state: z.string().transform((v) => v as SalesforceJobState),
  concurrencyMode: z.string(),
  contentType: z.string().transform((v) => v as 'CSV'), // Currently only CSV is supported.
  apiVersion: z.number(),
  lineEnding: z.string(),
  columnDelimiter: z.string(),
});

// -
// User
// -
export const salesforceUser = validators
  .object({
    Id: z.string(),
    FirstName: z.string().nullable(),
    LastName: z.string().nullable(),
    Email: z.string().nullable(),
    CreatedDate: validators.date(),
    LastModifiedDate: validators.date(),
  })
  .partial()
  .required(requiredFields);

// -
// Contact
// -
export const salesforceContact = validators
  .object({
    Id: z.string(),
    FirstName: z.string().nullable(),
    LastName: z.string().nullable(),
    Title: z.string().nullable(),
    Email: z.string().nullable(),
    Phone: z.string().nullable(),
    MobilePhone: z.string().nullable(),
    CreatedDate: validators.date(),
    LastModifiedDate: validators.date(),
    AccountId: z.string().nullable(),
    OwnerId: z.string().nullable(),
  })
  .partial()
  .required(requiredFields);

export const salesforceContactCreate = validators.object({
  Contact: z.object({
    Email: z.string().optional(),
    FirstName: z.string().optional(),
    LastName: z.string().optional(),
    Title: z.string().optional(),
    Phone: z.string().optional(),
    MobilePhone: z.string().optional(),
    AccountId: z.string().optional(),
    OwnerId: z.string().optional(),
    $native: z.record(z.any()).optional(),
  }),
});

export const salesforceContactCreateResponse = validators.object({
  id: z.string(),
});

export const salesforceContactUpdate = validators.object({
  Id: z.string(),
  Contact: z.object({
    Email: z.string().optional(),
    FirstName: z.string().optional(),
    LastName: z.string().optional(),
    Title: z.string().optional(),
    Phone: z.string().optional(),
    MobilePhone: z.string().optional(),
    AccountId: z.string().optional(),
    OwnerId: z.string().optional(),
    $native: z.record(z.any()).optional(),
  }),
});

// -
// Account
// -
export const salesforceAccount = validators
  .object({
    Id: z.string(),
    Name: z.string().nullable(),
    Description: z.string().nullable(),
    Industry: z.string().nullable(),
    AnnualRevenue: z.union([z.number(), z.string()]).nullable(),
    NumberOfEmployees: z.union([z.number(), z.string()]).nullable(),
    Website: z.string().nullable(),
    BillingAddress: z
      .object({
        street: z.string().nullable(),
        city: z.string().nullable(),
        state: z.string().nullable(),
        postalCode: z.string().nullable(),
        country: z.string().nullable(),
      })
      .nullable(),
    Phone: z.string().nullable(),
    CreatedDate: validators.date(),
    LastModifiedDate: validators.date(),
    OwnerId: z.string().nullable(),
    Contacts: z
      .object({ records: z.array(z.object({ Id: z.string() })) })
      .nullable(),
    Opportunities: z
      .object({ records: z.array(z.object({ Id: z.string() })) })
      .nullable(),
  })
  .partial()
  .required(requiredFields);
export const salesforceAccountRelationalSelect = {
  Contact: '(SELECT Id FROM Contacts)',
  Opportunity: '(SELECT Id FROM Opportunities)',
};

export const salesforceAccountCreate = validators.object({
  Account: z
    .object({
      Name: z.string(),
      Description: z.string(),
      Industry: z.string(),
      AnnualRevenue: z.number(),
      NumberOfEmployees: z.number(),
      Website: z.string(),
      BillingStreet: z.string(),
      BillingCity: z.string(),
      BillingState: z.string(),
      BillingPostalCode: z.string(),
      BillingCountry: z.string(),
      Phone: z.string(),
      OwnerId: z.string(),
      $native: z.record(z.any()),
    })
    .partial(),
});

export const salesforceAccountCreateResponse = validators.object({
  id: z.string(),
});

export const salesforceAccountUpdate = validators.object({
  Id: z.string(),
  Account: z
    .object({
      Name: z.string(),
      Description: z.string(),
      Industry: z.string(),
      AnnualRevenue: z.number(),
      NumberOfEmployees: z.number(),
      Website: z.string(),
      BillingStreet: z.string(),
      BillingCity: z.string(),
      BillingState: z.string(),
      BillingPostalCode: z.string(),
      BillingCountry: z.string(),
      Phone: z.string(),
      OwnerId: z.string(),
      $native: z.record(z.any()),
    })
    .partial(),
});

// -
// Opportunity
// -
export const salesforceOpportunity = validators
  .object({
    Id: z.string(),
    Name: z.string().nullable(),
    StageName: z.string().nullable(),
    Amount: z.union([z.number(), z.string()]).nullable(),
    CloseDate: validators.date().nullable(),
    Probability: z.union([z.number(), z.string()]).nullable(),
    ExpectedRevenue: z.union([z.number(), z.string()]).nullable(),
    IsWon: z.boolean().nullable(),
    IsClosed: z.boolean().nullable(),
    ContactId: z.string().nullable(),
    AccountId: z.string().nullable(),
    CreatedDate: validators.date(),
    OwnerId: z.string().nullable(),
    LastModifiedDate: validators.date(),
  })
  .partial()
  .required(requiredFields);

export const salesforceOpportunityCreate = validators.object({
  Opportunity: z
    .object({
      Name: z.string(),
      Amount: z.number(),
      CloseDate: validators.date(),
      Probability: z.string(),
      AccountId: z.string(),
      ContactId: z.string(),
      StageName: z.string(),
      $native: z.record(z.any()),
    })
    .partial(),
});

export const salesforceOpportunityCreateResponse = validators.object({
  id: z.string(),
});

export const salesforceOpportunityUpdate = validators.object({
  Id: z.string(),
  Opportunity: z
    .object({
      Name: z.string(),
      Amount: z.number(),
      CloseDate: validators.date(),
      Probability: z.string(),
      AccountId: z.string(),
      $native: z.record(z.any()),
    })
    .partial(),
});

// -
// Lead
// -
export const salesforceLead = validators
  .object({
    Id: z.string(),
    FirstName: z.string().nullable(),
    LastName: z.string().nullable(),
    Title: z.string().nullable(),
    Email: z.string().nullable(),
    Company: z.string().nullable(),
    Phone: z.string().nullable(),
    MobilePhone: z.string().nullable(),
    OwnerId: z.string().nullable(),
    CreatedDate: validators.date(),
    LastModifiedDate: validators.date(),
  })
  .partial()
  .required(requiredFields);

export const salesforceLeadCreate = validators.object({
  Lead: z
    .object({
      Email: z.string(),
      FirstName: z.string(),
      LastName: z.string(),
      Phone: z.string(),
      Title: z.string(),
      MobilePhone: z.string(),
      Company: z.string(),
      $native: z.record(z.any()),
    })
    .partial(),
});

export const salesforceLeadCreateResponse = validators.object({
  id: z.string(),
});

export const salesforceLeadUpdate = validators.object({
  Id: z.string(),
  Lead: z
    .object({
      Email: z.string(),
      FirstName: z.string(),
      LastName: z.string(),
      Phone: z.string(),
      Title: z.string(),
      MobilePhone: z.string(),
      Company: z.string(),
      $native: z.record(z.any()),
    })
    .partial(),
});

// -
// Note
// -
export const salesforceNote = validators
  .object({
    Id: z.string(),
    CreatedDate: validators.date(),
    LastModifiedDate: validators.date(),
    Body: z.string().nullable(),
    OwnerId: z.string().nullable(),
    ParentId: z.string().nullable(),
    Parent: z.object({ Type: z.string() }).nullable(),
  })
  .partial()
  .required(requiredFields);
export const salesforceNoteRelationalSelect = {
  Account: 'Parent.Type',
  Contact: 'Parent.Type',
  Opportunity: 'Parent.Type',
  Lead: 'Parent.Type',
};

export const salesforceNoteCreate = validators.object({
  Note: z
    .object({
      ParentId: z.string(),
      Body: z.string(),
      OwnerId: z.string(),
      Title: z.string(),
      $native: z.record(z.any()),
    })
    .partial(),
});

export const salesforceNoteCreateResponse = validators.object({
  id: z.string(),
});

export const salesforceNoteUpdate = validators.object({
  Id: z.string(),
  Note: z
    .object({
      Body: z.string(),
      OwnerId: z.string(),
      $native: z.record(z.any()),
    })
    .partial(),
});

// -
// ContentDocumentLink (used for ContentNote)
// -
export const salesforceContentDocumentLink = z
  .object({
    Id: z.string(),
    ContentDocumentId: z.string(),
    LinkedEntityId: z.string(),
    IsDeleted: z.boolean(),
  })
  .partial()
  .required({ Id: true, ContentDocumentId: true, LinkedEntityId: true });

export const salesforceContentDocumentLinkCreate = validators.object({
  ContentDocumentLink: z.object({
    ContentDocumentId: z.string(),
    LinkedEntityId: z.string(),
  }),
});

export const salesforceContentDocumentLinkCreateResponse = validators.object({
  id: z.string(),
});

// -
// ContentNoteContent
// -
export const salesforceContentNoteContent = validators.object({
  body: z.object({
    _readableState: z.any(),
  }),
});

// -
// ContentNote
// -
export const salesforceContentNote = validators
  .object({
    Id: z.string(),
    CreatedDate: validators.date(),
    LastModifiedDate: validators.date(),
    TextPreview: z.string().nullable(),
    Content: z.string().nullable(), // url to fetch the Content Body.
    OwnerId: z.string().nullable(),
    ContentDocumentLinks: z
      .object({
        records: z.array(salesforceContentDocumentLink),
      })
      .nullable(),
  })
  .partial()
  .required(requiredFields);

export const salesforceContentNoteCreate = validators.object({
  ContentNote: z
    .object({
      Content: z.string(),
      OwnerId: z.string(),
      Title: z.string(),
    })
    .partial(),
});

export const salesforceContentNoteCreateResponse = validators.object({
  id: z.string(),
});

export const salesforceContentNoteUpdate = validators.object({
  Id: z.string(),
  ContentNote: z
    .object({
      Content: z.string(),
      OwnerId: z.string(),
    })
    .partial(),
});

// -
// Task
// -
export type SalesforceCallType = (typeof SALESFORCE_CALL_TYPES)[number];
export const salesforceTask = validators
  .object({
    Id: z.string(),
    CreatedDate: validators.date(),
    LastModifiedDate: validators.date(),
    ActivityDate: validators.date().nullable(),
    Description: z.string().nullable(),
    IsClosed: z.boolean().nullable(),
    OwnerId: z.string().nullable(),
    Priority: z.string().nullable(),
    Status: z.string().nullable(),
    Subject: z.string().nullable(),
    CallDisposition: z.string().nullable(),
    CallType: z
      .string()
      .transform((v) => v as SalesforceCallType)
      .nullable(),
    TaskSubtype: z.string().nullable(),
    Who: z.object({ Id: z.string(), Type: z.string().optional() }).nullable(),
    What: z.object({ Id: z.string(), Type: z.string().optional() }).nullable(),
  })
  .partial()
  .required(requiredFields);
export const salesforceTaskRelationalSelect = {
  Account: 'What.Id',
  Opportunity: 'What.Id',
  Contact: 'Who.Id',
  Lead: 'Who.Id',
};

export const salesforceTaskCreate = validators.object({
  Task: z
    .object({
      ActivityDate: validators.date(),
      Description: z.string(),
      OwnerId: z.string(),
      Priority: z.string(),
      Status: z.string(),
      Subject: z.string(),
      WhoId: z.string(),
      WhoIds: z.array(z.string()),
      WhatId: z.string(),
      CallDisposition: z.string(),
      CallType: z.enum(SALESFORCE_CALL_TYPES),
      TaskSubtype: z.literal('Call'),
      $native: z.record(z.any()),
    })
    .partial(),
});

export const salesforceTaskCreateResponse = validators.object({
  id: z.string(),
});

export const salesforceTaskUpdate = validators.object({
  Id: z.string(),
  Task: z
    .object({
      ActivityDate: validators.date(),
      Description: z.string(),
      OwnerId: z.string(),
      Priority: z.string(),
      Status: z.string(),
      Subject: z.string(),
      CallDisposition: z.string(),
      CallType: z.enum(SALESFORCE_CALL_TYPES),
      TaskSubtype: z.literal('Call'),
      $native: z.record(z.any()),
    })
    .partial(),
});

// -
// Event
// -
export const salesforceEvent = validators
  .object({
    Id: z.string(),
    OwnerId: z.string(),
    CreatedDate: validators.date(),
    LastModifiedDate: validators.date(),
    Subject: z.string().nullable(),
    Type: z.string().nullable(),
    Description: z.string().nullable(),
    StartDateTime: validators.date().nullable(),
    EndDateTime: validators.date().nullable(),
    Location: z.string().nullable(),
    IsAllDayEvent: z.boolean().nullable(),
    ActivityDate: validators.date().nullable(),
    ActivityDateTime: validators.date().nullable(),
    AcceptedEventInviteeIds: z.array(z.string()).nullable(),
    DeclinedEventInviteeIds: z.array(z.string()).nullable(),
    UndecidedEventInviteeIds: z.array(z.string()).nullable(),
    Who: z
      .object({
        Id: z.string(),
        Type: z.string().optional(),
      })
      .nullable(),
    What: z
      .object({
        Id: z.string(),
        Type: z.string().optional(),
      })
      .nullable(),
    EventRelations: z
      .object({
        records: z.array(
          z.object({
            Id: z.string(),
          }),
        ),
      })
      .nullable(),
  })
  .partial()
  .required(requiredFields);
export const salesforceEventRelationalSelect = {
  Account: 'What.Id',
  Opportunity: 'What.Id',
  Contact: 'Who.Id',
  Lead: 'Who.Id',
  EventRelation: '(SELECT Id, RelationId FROM EventRelations)',
};

export const salesforceEventCreate = validators.object({
  Event: z
    .object({
      Subject: z.string(),
      Type: z.string(),
      Description: z.string(),
      StartDateTime: validators.date(),
      EndDateTime: validators.date(),
      Location: z.string(),
      IsAllDayEvent: z.boolean(),
      WhoId: z.string(),
      WhatId: z.string(),
      $native: z.record(z.any()),
    })
    .partial(),
});

export const salesforceEventCreateResponse = validators.object({
  id: z.string(),
});

export const salesforceEventUpdate = validators.object({
  Id: z.string(),
  Event: z
    .object({
      Subject: z.string(),
      Type: z.string(),
      Description: z.string(),
      StartDateTime: validators.date(),
      EndDateTime: validators.date(),
      Location: z.string(),
      IsAllDayEvent: z.boolean(),
      $native: z.record(z.any()),
    })
    .partial(),
});

// -
// EventRelation
// -
export const salesforceEventRelation = validators
  .object({
    Id: z.string(),
    CreatedDate: validators.date(),
    LastModifiedDate: validators.date(),
    EventId: z.string().nullable(),
    RelationId: z.string().nullable(),
    Status: z.string().nullable(),
    IsInvitee: z.boolean().nullable(),
  })
  .partial()
  .required(requiredFields);

export const salesforceEventRelationCreate = validators.object({
  EventRelation: z
    .object({
      EventId: z.string(),
      RelationId: z.string(),
      Status: z.string(),
      $native: z.record(z.any()),
    })
    .partial(),
});

export const salesforceEventRelationCreateResponse = validators.object({
  id: z.string(),
});

export const salesforceEventRelationUpdate = validators.object({
  Id: z.string(),
  EventRelation: z
    .object({
      Status: z.string(),
      $native: z.record(z.any()),
    })
    .partial(),
});

// -
// EmailMessage
// -
export const salesforceEmailMessage = validators
  .object({
    Id: z.string(),
    FromAddress: z.string(),
    ToAddress: z.string(),
    CcAddress: z.string().nullable(),
    BccAddress: z.string().nullable(),
    Subject: z.string().nullable(),
    TextBody: z.string().nullable(),
    HtmlBody: z.string().nullable(),
    MessageDate: validators.date().nullable(),
    Incoming: z.boolean().nullable(),
    IsBounced: z.boolean().nullable(),
    HasAttachment: z.boolean().nullable(),
    Status: z.string().nullable(),
    CreatedDate: validators.date(),
    LastModifiedDate: validators.date(),
    CreatedById: z.string().nullable(),
    IsArchived: z.boolean().nullable(),
    IsDeleted: z.boolean().nullable(),
    RelatedTo: z
      .object({
        Id: z.string(),
        Type: z.string().optional(),
      })
      .nullable(),
  })
  .partial()
  .required({
    ...requiredFields,
    FromAddress: true,
  });
export const salesforceEmailMessageRelationalSelect = {
  Account: 'RelatedTo.Type, RelatedTo.Id',
  Opportunity: 'RelatedTo.Type, RelatedTo.Id',
  Contact: 'RelatedTo.Type, RelatedTo.Id',
  Lead: 'RelatedTo.Type, RelatedTo.Id',
};

export const salesforceEmailMessageCreate = validators.object({
  EmailMessage: z
    .object({
      FromAddress: z.string(),
      ToAddress: z.string(),
      CcAddress: z.string(),
      BccAddress: z.string(),
      Subject: z.string(),
      TextBody: z.string(),
      HtmlBody: z.string(),
      MessageDate: validators.date(),
      Incoming: z.boolean(),
      Status: z.number(),
      CreatedById: z.string(),
      RelatedToId: z.string(),
      $native: z.record(z.any()),
    })
    .partial(),
});

export const salesforceEmailMessageCreateResponse = validators.object({
  id: z.string(),
});

export const salesforceEmailMessageUpdate = validators.object({
  Id: z.string(),
  EmailMessage: z
    .object({
      Status: z.number(),
      $native: z.record(z.any()),
    })
    .partial(),
});

// -
// EmailMessageRelation
// -
export const salesforceEmailMessageRelation = validators
  .object({
    Id: z.string(),
    EmailMessageId: z.string(),
    RelationId: z.string().nullable(),
    RelationAddress: z.string().nullable(),
    RelationObjectType: z.string().nullable(),
    RelationType: z.string().nullable(),
    IsDeleted: z.boolean().nullable(),
    CreatedDate: validators.date(),
    SystemModstamp: validators.date(),
  })
  .partial()
  .required({
    ...requiredFields,
    EmailMessageId: true,
  });

export const salesforceEmailMessageRelationCreate = validators.object({
  EmailMessageRelation: z
    .object({
      EmailMessageId: z.string(),
      RelationId: z.string(),
      RelationType: z.enum([
        'ToAddress',
        'CcAddress',
        'BccAddress',
        'FromAddress',
        'OtherAddress',
      ]),
      $native: z.record(z.any()),
    })
    .partial(),
});

export const salesforceEmailMessageRelationCreateResponse = validators.object({
  id: z.string(),
});

// -
// ListView
// -
export const salesforceListView = validators
  .object({
    Id: z.string(),
    Name: z.string(),
    CreatedDate: validators.date(),
    LastModifiedDate: validators.date(),
    CreatedById: z.string(),
  })
  .partial()
  .required({
    ...requiredFields,
    Name: true,
  });

export const salesforceListViewResult = validators.object({
  developerName: z.string(),
  done: z.boolean(),
  id: z.string(),
  label: z.string(),
  records: z.array(
    validators.object({
      columns: z.array(
        validators.object({
          fieldNameOrPath: z.string(),
          value: z.string(),
        }),
      ),
    }),
  ),
  size: z.number(),
});

// -
// Schemas
// -
export const SalesforceSchemaByObjectType: Record<
  SalesforceSupportedObjectType,
  z.ZodType
> = {
  User: salesforceUser,
  Contact: salesforceContact,
  ListView: salesforceListView,
  Account: salesforceAccount,
  Opportunity: salesforceOpportunity,
  Lead: salesforceLead,
  Note: salesforceNote,
  ContentNote: salesforceContentNote,
  ContentDocumentLink: salesforceContentDocumentLink,
  Task: salesforceTask,
  Event: salesforceEvent,
  EventRelation: salesforceEventRelation,
  EmailMessage: salesforceEmailMessage,
  EmailMessageRelation: salesforceEmailMessageRelation,
};

export type SalesforceAccountType = 'Production' | 'Sandbox';
export const salesforceOAuthUrlsByAccountType: Record<
  SalesforceAccountType,
  HttpsUrl
> = {
  Production: `https://login.salesforce.com/services/oauth2`,
  Sandbox: `https://test.salesforce.com/services/oauth2`,
};

export type SalesforceSupportedObjectType =
  (typeof SALESFORCE_SUPPORTED_OBJECT_TYPE)[number];
export type SalesforceSObject = z.infer<typeof salesforceSObject>;
export type SalesforceField = z.infer<typeof salesforceField>;
export type SalesforceUser = z.infer<typeof salesforceUser>;
export type SalesforceContact = z.infer<typeof salesforceContact>;
export type SalesforceContactCreate = z.infer<typeof salesforceContactCreate>;
export type SalesforceContactUpdate = z.infer<typeof salesforceContactUpdate>;
export type SalesforceAccount = z.infer<typeof salesforceAccount>;
export type SalesforceAccountCreate = z.infer<typeof salesforceAccountCreate>;
export type SalesforceAccountUpdate = z.infer<typeof salesforceAccountUpdate>;
export type SalesforceOpportunity = z.infer<typeof salesforceOpportunity>;
export type SalesforceOpportunityCreate = z.infer<
  typeof salesforceOpportunityCreate
>;
export type SalesforceOpportunityUpdate = z.infer<
  typeof salesforceOpportunityUpdate
>;
export type SalesforceLead = z.infer<typeof salesforceLead>;
export type SalesforceLeadCreate = z.infer<typeof salesforceLeadCreate>;
export type SalesforceLeadUpdate = z.infer<typeof salesforceLeadUpdate>;
export type SalesforceNote = z.infer<typeof salesforceNote>;
export type SalesforceNoteCreate = z.infer<typeof salesforceNoteCreate>;
export type SalesforceNoteUpdate = z.infer<typeof salesforceNoteUpdate>;
export type SalesforceContentNote = z.infer<typeof salesforceContentNote>;
export type SalesforceContentNoteCreate = z.infer<
  typeof salesforceContentNoteCreate
>;
export type SalesforceContentNoteUpdate = z.infer<
  typeof salesforceContentNoteUpdate
>;
export type SalesforceContentDocumentLink = z.infer<
  typeof salesforceContentDocumentLink
>;
export type SalesforceContentDocumentLinkCreate = z.infer<
  typeof salesforceContentDocumentLinkCreate
>;
export type SalesforceContentNoteContent = z.infer<
  typeof salesforceContentNoteContent
>;
export type SalesforceTask = z.infer<typeof salesforceTask>;
export type SalesforceTaskCreate = z.infer<typeof salesforceTaskCreate>;
export type SalesforceTaskUpdate = z.infer<typeof salesforceTaskUpdate>;
export type SalesforceEvent = z.infer<typeof salesforceEvent>;
export type SalesforceEventCreate = z.infer<typeof salesforceEventCreate>;
export type SalesforceEventUpdate = z.infer<typeof salesforceEventUpdate>;
export type SalesforceEventRelation = z.infer<typeof salesforceEventRelation>;
export type SalesforceEventRelationCreate = z.infer<
  typeof salesforceEventRelationCreate
>;
export type SalesforceEventRelationUpdate = z.infer<
  typeof salesforceEventRelationUpdate
>;
export type SalesforceEmailMessage = z.infer<typeof salesforceEmailMessage>;
export type SalesforceEmailMessageCreate = z.infer<
  typeof salesforceEmailMessageCreate
>;
export type SalesforceEmailMessageUpdate = z.infer<
  typeof salesforceEmailMessageUpdate
>;
export type SalesforceEmailMessageRelation = z.infer<
  typeof salesforceEmailMessageRelation
>;
export type SalesforceEmailMessageRelationCreate = z.infer<
  typeof salesforceEmailMessageRelationCreate
>;
export type SalesforceListView = z.infer<typeof salesforceListView>;
export type SalesforceListViewResult = z.infer<typeof salesforceListViewResult>;

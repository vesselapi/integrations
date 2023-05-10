import { HttpsUrl } from '@/sdk';
import * as validators from '@/sdk/validators';
import { z } from 'zod';
import { SALESFORCE_SUPPORTED_OBJECT_TYPE } from './constants';

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
// User
// -
export const salesforceUser = validators.object({
  Id: z.string(),
  FirstName: z.string(),
  LastName: z.string(),
  Email: z.string().email(),
  CreatedDate: validators.date(),
  LastModifiedDate: validators.date(),
});

// -
// Contact
// -
export const salesforceContact = validators.object({
  Id: z.string(),
  FirstName: z.string(),
  LastName: z.string(),
  Title: z.string(),
  Email: z.string().email(),
  Phone: z.string(),
  MobilePhone: z.string(),
  CreatedDate: validators.date(),
  LastModifiedDate: validators.date(),
  AccountId: z.string(),
  OwnerId: z.string(),
});

export const salesforceContactCreate = validators.object({
  Contact: z.object({
    Email: z.string().email(),
    FirstName: z.string().optional(),
    LastName: z.string().optional(),
    Title: z.string().optional(),
    Phone: z.string().optional(),
    MobilePhone: z.string().optional(),
    AccountId: z.string().optional(),
    OwnerId: z.string().optional(),
  }),
});

export const salesforceContactCreateResponse = validators.object({
  id: z.string(),
});

export const salesforceContactUpdate = validators.object({
  Id: z.string(),
  Contact: z.object({
    Email: z.string().email().optional(),
    FirstName: z.string().optional(),
    LastName: z.string().optional(),
    Title: z.string().optional(),
    Phone: z.string().optional(),
    MobilePhone: z.string().optional(),
    AccountId: z.string().optional(),
    OwnerId: z.string().optional(),
  }),
});

// -
// Account
// -
export const salesforceAccount = validators.object({
  Id: z.string(),
  Name: z.string(),
  Description: z.string(),
  Industry: z.string(),
  AnnualRevenue: z.string(),
  NumberOfEmployees: z.string(),
  Website: z.string(),
  BillingAddress: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string(),
  }),
  Phone: z.string(),
  CreatedDate: validators.date(),
  LastModifiedDate: validators.date(),
  OwnerId: z.string(),
});
export const salesforceAccountRelationalSelect =
  '(SELECT Id FROM Opportunities), (SELECT Id FROM Contacts)';

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
    })
    .partial(),
});

// -
// Opportunity
// -
export const salesforceOpportunity = validators.object({
  Id: z.string(),
  Name: z.string(),
  StageName: z.string(),
  Amount: z.string(),
  CloseDate: validators.date(),
  Probability: z.string(),
  ExpectedRevenue: z.string(),
  IsWon: z.boolean(),
  IsClosed: z.boolean(),
  ContactId: z.string(),
  AccountId: z.string(),
  CreatedDate: validators.date(),
  OwnerId: z.string(),
  LastModifiedDate: validators.date(),
});

export const salesforceOpportunityCreate = validators.object({
  Opportunity: z
    .object({
      Name: z.string(),
      Amount: z.number(),
      CloseDate: validators.date(),
      Probability: z.string(),
      AccountId: z.string(),
      StageName: z.string(),
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
    })
    .partial(),
});

// -
// ListView
// -
export const salesforceListView = validators.object({
  Id: z.string(),
  Name: z.string(),
  CreatedDate: validators.date(),
  LastModifiedDate: validators.date(),
  CreatedById: z.string(),
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
};

export type SalesforceAccountType = 'Production' | 'Sandbox';
export interface SalesforceAuthAnswers extends Record<string, string> {
  accountType: SalesforceAccountType;
}
export const salesforceOAuthUrlsByAccountType: Record<
  SalesforceAccountType,
  HttpsUrl
> = {
  Production: `https://login.salesforce.com/services/oauth2`,
  Sandbox: `https://test.salesforce.com/services/oauth2`,
};

export type SalesforceSupportedObjectType =
  (typeof SALESFORCE_SUPPORTED_OBJECT_TYPE)[number];
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
export type SalesforceListView = z.infer<typeof salesforceListView>;

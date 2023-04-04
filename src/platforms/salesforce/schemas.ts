import { HttpsUrl } from '@/sdk';
import * as custom from '@/sdk/validators';
import * as validators from '@/sdk/validators';
import { z } from 'zod';

export const salesforceUser = custom.object({
  Id: z.number(),
  FirstName: z.string(),
  LastName: z.string(),
  Email: z.string().email(),
  CreatedDate: validators.date(),
  LastModifiedDate: validators.date(),
});

export const salesforceContact = custom.object({
  Id: z.number(),
  FirstName: z.string(),
  LastName: z.string(),
  Title: z.string(),
  Email: z.string().email(),
  Phone: z.string(),
  MobilePhone: z.string(),
  CreatedDate: validators.date(),
  LastModifiedDate: validators.date(),
  AccountId: z.number(),
  OwnerId: z.number(),
});

export const salesforceContactCreate = custom.object({
  Email: z.string().email(),
  FirstName: z.string().optional(),
  LastName: z.string().optional(),
  Title: z.string().optional(),
  Phone: z.string().optional(),
  MobilePhone: z.string().optional(),
  AccountId: z.number().optional(),
  OwnerId: z.number().optional(),
});

export const salesforceContactUpdate = custom.object({
  Id: z.number(),
  Email: z.string().email().optional(),
  FirstName: z.string().optional(),
  LastName: z.string().optional(),
  Title: z.string().optional(),
  Phone: z.string().optional(),
  MobilePhone: z.string().optional(),
  AccountId: z.number().optional(),
  OwnerId: z.number().optional(),
});

export const salesforceListView = custom.object({
  Id: z.number(),
  Name: z.string(),
  CreatedDate: validators.date(),
  LastModifiedDate: validators.date(),
  CreatedById: z.number(),
});

export const salesforceListViewResult = custom.object({
  developerName: z.string(),
  done: z.boolean(),
  id: z.number(),
  label: z.string(),
  records: z.array(
    custom.object({
      columns: z.array(
        custom.object({
          fieldNameOrPath: z.string(),
          value: z.string(),
        }),
      ),
    }),
  ),
  size: z.number(),
});

export const SalesforceSchemaByObjectType: Record<
  SalesforceSupportedObjectType,
  z.ZodType
> = {
  User: salesforceUser,
  Contact: salesforceContact,
  ListView: salesforceListView,
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

export type SalesforceSupportedObjectType = 'User' | 'Contact' | 'ListView';
export type SalesforceUser = z.infer<typeof salesforceUser>;
export type SalesforceContact = z.infer<typeof salesforceContact>;
export type SalesforceContactCreate = z.infer<typeof salesforceContactCreate>;
export type SalesforceContactUpdate = z.infer<typeof salesforceContactUpdate>;
export type SalesforceListView = z.infer<typeof salesforceListView>;

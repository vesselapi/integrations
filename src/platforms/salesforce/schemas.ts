import { HttpsUrl } from '@/sdk';
import * as validators from '@/sdk/validators';
import { z } from 'zod';

export const salesforceUser = z.object({
  Id: z.string(),
  FirstName: z.string(),
  LastName: z.string(),
  Email: z.string().email(),
  CreatedDate: validators.date(),
  LastModifiedDate: validators.date(),
});

export const salesforceContact = z.object({
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

export const salesforceContactCreate = z.object({
  Email: z.string().email(),
  FirstName: z.string().optional(),
  LastName: z.string().optional(),
  Title: z.string().optional(),
  Phone: z.string().optional(),
  MobilePhone: z.string().optional(),
  AccountId: z.string().optional(),
  OwnerId: z.string().optional(),
});

export const salesforceContactUpdate = z.object({
  Email: z.string().email().optional(),
  FirstName: z.string().optional(),
  LastName: z.string().optional(),
  Title: z.string().optional(),
  Phone: z.string().optional(),
  MobilePhone: z.string().optional(),
  AccountId: z.string().optional(),
  OwnerId: z.string().optional(),
});

export const salesforceListView = z.object({
  Id: z.string(),
  Name: z.string(),
  CreatedDate: validators.date(),
  LastModifiedDate: validators.date(),
  CreatedById: z.string(),
});

export const salesforceListViewResult = z.object({
  developerName: z.string(),
  done: z.boolean(),
  id: z.string(),
  label: z.string(),
  records: z.array(
    z.object({
      columns: z.array(
        z.object({
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

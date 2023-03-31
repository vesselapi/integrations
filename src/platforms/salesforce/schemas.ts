import { HttpsUrl } from '@/sdk';
import * as validators from '@/sdk/validators';
import { z } from 'zod';
import { SalesforceSupportedObjectType } from './constants';

export const salesforceUser = z
  .object({
    Id: z.number(),
    FirstName: z.string(),
    LastName: z.string(),
    Email: z.string().email(),
    CreatedDate: validators.date(),
    LastModifiedDate: validators.date(),
  })
  .passthrough();

export const salesforceContact = z
  .object({
    Id: z.number(),
    FirstName: z.string(),
    LastName: z.string(),
    Title: z.string(),
    Email: z.string().email(),
    Phone: z.string(),
    MobilePhone: z.string(),
    CreatedDate: validators.date(),
    LastModifiedDate: validators.date(),
  })
  .passthrough();

export const salesforceList = z
  .object({
    Id: z.string(),
    Name: z.string(),
    CreatedDate: validators.date(),
    LastModifiedDate: validators.date(),
  })
  .passthrough();

export const SalesforceSchemaByObjectType: Record<
  SalesforceSupportedObjectType,
  z.ZodType
> = {
  User: salesforceUser,
  Contact: salesforceContact,
  List: salesforceList,
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

export type SalesforceSupportedObjectType = 'User' | 'Contact' | 'List';
export type SalesforceUser = z.infer<typeof salesforceUser>;
export type SalesforceContact = z.infer<typeof salesforceContact>;
export type SalesforceList = z.infer<typeof salesforceList>;

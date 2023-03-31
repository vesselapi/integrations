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

export type SalesforceSupportedObjectType = 'User' | 'Contact' | 'List';
export type SalesforceUser = z.infer<typeof salesforceUser>;
export type SalesforceContact = z.infer<typeof salesforceContact>;
export type SalesforceList = z.infer<typeof salesforceList>;

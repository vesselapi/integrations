import * as custom from '@/sdk/validators';
import { z } from 'zod';
import { EMAIL_TYPES, PHONE_TYPES, PIPEDRIVE_MODULES } from './constants';

// -
// Client Definitions
// -
export type FindObjectInput = {
  id: string;
};
export type ListObjectInput = {
  start?: number;
  limit?: number;
};
export type BatchReadObjectInput = {
  ids: string[];
} & ListObjectInput;
export type SearchObjectInput = {
  term: string;
  exact_match: 0 | 1;
} & ListObjectInput;
export type ListOutput<T> = {
  data?: T[];
  additional_data?: {
    pagination?: { more_items_in_collection?: boolean; start?: number };
  };
};
export const listResponseSchema = (itemSchema: z.ZodSchema) =>
  z.object({
    data: z.array(itemSchema).optional(),
    additional_data: z
      .object({
        pagination: z
          .object({
            more_items_in_collection: z.boolean().optional(),
            start: z.number().optional(),
          })
          .optional(),
      })
      .optional(),
  });
export type SearchOutput<T> = {
  data?: {
    items?: {
      result_score: number;
      item?: T;
    }[];
  };
  additional_data?: {
    properties?: { more_items_in_collection?: boolean; start?: number };
  };
};
export const searchResponseSchema = (itemSchema: z.ZodSchema) =>
  z.object({
    data: z
      .object({
        items: z
          .array(
            z.object({
              result_score: z.number(),
              item: itemSchema,
            }),
          )
          .optional(),
      })
      .optional(),
    additional_data: z
      .object({
        properties: z
          .object({
            more_items_in_collection: z.boolean().optional(),
            start: z.number().optional(),
          })
          .optional(),
      })
      .optional(),
  });

export const pipedriveModuleSchema = z.enum(PIPEDRIVE_MODULES);
export type PipedriveModule = typeof PIPEDRIVE_MODULES[number];

export const upsertResponseSchema = z.object({
  id: z.string(),
});
export type UpsertResponse = {
  id: string;
};

// -
// Subtypes
// -
export type PipedriveEmailAddressType = typeof EMAIL_TYPES[number];
export const pipedriveEmailAddressSchema = z.object({
  primary: z.boolean(),
  label: z.string().transform((l) => l as PipedriveEmailAddressType),
  value: z.string(),
});

export type PipedrivePhoneNumberType = typeof PHONE_TYPES[number];
export const pipedrivePhoneNumberSchema = z.object({
  primary: z.boolean(),
  label: z.string().transform((l) => l as PipedrivePhoneNumberType),
  value: z.string(),
});

export const pipedriveAssociationId = z.object({
  value: z.number(),
  name: z.string(),
});

// -
// Users
// -
export const pipedriveUserMeSchema = z.object({
  id: z.number(),
  company_domain: z.string(),
  company_id: z.number(),
});
export type PipedriveUserMe = z.infer<typeof pipedriveUserMeSchema>;
export const pipedriveUserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  created: custom.date(),
  modified: custom.date().optional(),
  active_flag: z.boolean(),
});
export type PipedriveUser = z.infer<typeof pipedriveUserSchema>;

// -
// Person
// -
const pipedrivePersonSchema = z.object({
  id: z.string(),
  name: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.array(pipedriveEmailAddressSchema),
  phone: z.array(pipedrivePhoneNumberSchema),
  add_time: custom.date(),
  update_time: custom.date(),
  active_flag: z.boolean(),
  org_id: pipedriveAssociationId.optional(),
  owner_id: pipedriveAssociationId.optional(),
});
export type PipedrivePerson = z.infer<typeof pipedrivePersonSchema>;

export const pipedrivePersonUpsertSchema = z
  .object({
    name: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.array(pipedriveEmailAddressSchema),
    phone: z.array(pipedrivePhoneNumberSchema),
    org_id: z.number().optional(),
    owner_id: z.number().optional(),
    $native: z.record(z.any()),
  })
  .partial();
export type PipedrivePersonCreate = z.infer<typeof pipedrivePersonUpsertSchema>;
export type PipedrivePersonUpdate = z.infer<
  typeof pipedrivePersonUpsertSchema
> & { id: string };

// -
// Deals
// -
export const pipedriveDealSchema = z.object({
  id: z.number(),
  title: z.string(),
  stage_id: z.number(),
  value: z.string(),
  expected_close_date: custom.date(),
  weighted_value: z.string(),
  status: z.string(),
  active: z.boolean(),
  probability: z.string(),
  update_time: custom.date(),
  add_time: custom.date(),
  deleted: z.boolean(),
  person_id: z.object({ value: z.number() }),
  org_id: z.object({ value: z.number() }),
  user_id: z.object({ value: z.number() }),
});
export type PipedriveDeal = z.infer<typeof pipedriveDealSchema>;
export const pipedriveDealUpsertSchema = z
  .object({
    title: z.string(),
    value: z.number(),
    expected_close_date: custom.date(),
    probability: z.string(),
    stage_id: z.number(),
    org_id: z.number(),
    $native: z.record(z.any()),
  })
  .partial();
export type PipedriveDealCreate = z.infer<typeof pipedriveDealUpsertSchema>;
export type PipedriveDealUpdate = z.infer<typeof pipedriveDealUpsertSchema> & {
  id: string;
};

// -
// Notes
// -
export const pipedriveNoteSchema = z.object({
  id: z.number(),
  add_time: custom.date(),
  update_time: custom.date(),
  content: z.string(),
  user_id: z.number(),
  active_flag: z.boolean(),
  deal_id: z.number().optional(),
  person_id: z.number().optional(),
  org_id: z.number().optional(),
  lead_id: z.string().optional(),
});
export type PipedriveNote = z.infer<typeof pipedriveNoteSchema>;

export const pipedriveNoteCreateSchema = z
  .object({
    content: z.string(),
    user_id: z.string(),
    person_id: z.number().optional(),
    deal_id: z.number().optional(),
    org_id: z.number().optional(),
    lead_id: z.string().optional(),
    $native: z.record(z.any()),
  })
  .partial();
export type PipedriveNoteCreate = z.infer<typeof pipedriveNoteCreateSchema>;
export const pipedriveNoteUpdateSchema = z
  .object({
    content: z.string(),
    user_id: z.string(),
    $native: z.record(z.any()),
  })
  .partial();
export type PipedriveNoteUpdate = z.infer<typeof pipedriveNoteUpdateSchema> & {
  id: string;
};

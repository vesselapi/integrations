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
  fields?: string[];
  exact_match: 0 | 1;
} & ListObjectInput;
export type FindOutput<T> = {
  data: T;
};
export type ListOutput<T> = {
  data?: T[];
  additional_data?: {
    pagination?: { more_items_in_collection?: boolean; start?: number };
  };
};
export const findResponseSchema = <TOutput>(
  schema: z.ZodType<TOutput, any, any>,
) =>
  z.object({
    data: schema,
  }) as z.ZodType<FindOutput<TOutput>, any, any>;
export const listResponseSchema = <TOutput>(
  itemSchema: z.ZodType<TOutput, any, any>,
) =>
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
export type PipedriveModule = (typeof PIPEDRIVE_MODULES)[number];
export const upsertResponseSchema = z.object({
  data: z.object({ id: z.number() }),
});
export type UpsertResponse = {
  data: { id: number };
};

// -
// Subtypes
// -
export type PipedriveEmailAddressType = (typeof EMAIL_TYPES)[number];
export const pipedriveEmailAddressSchema = z.object({
  primary: z.boolean(),
  label: z.string().transform((l) => l as PipedriveEmailAddressType),
  value: z.string(),
});

export type PipedrivePhoneNumberType = (typeof PHONE_TYPES)[number];
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
export const pipedriveUserMeSchema = custom.addNativeToZodSchema(
  z.object({
    id: z.number(),
    company_domain: z.string(),
    company_id: z.number(),
  }),
);
export type PipedriveUserMe = z.infer<typeof pipedriveUserMeSchema>;
export const pipedriveUserSchema = custom.addNativeToZodSchema(
  z.object({
    id: z.number(),
    name: z.string().nullable(),
    email: z.string().nullable(),
    created: custom.date(),
    modified: custom.date().optional().nullable(),
    active_flag: z.boolean().nullable(),
  }),
);
export type PipedriveUser = z.infer<typeof pipedriveUserSchema>;

// -
// Person
// -
const pipedrivePersonSchema = custom.addNativeToZodSchema(
  z.object({
    id: z.number(),
    name: z.string().nullable(),
    first_name: z.string().nullable(),
    last_name: z.string().nullable(),
    email: z.array(pipedriveEmailAddressSchema).nullable(),
    phone: z.array(pipedrivePhoneNumberSchema).nullable(),
    add_time: custom.date(),
    update_time: custom.date(),
    active_flag: z.boolean().nullable(),
    org_id: pipedriveAssociationId.optional().nullable(),
    owner_id: pipedriveAssociationId.optional().nullable(),
  }),
);
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
export const pipedriveDealSchema = custom.addNativeToZodSchema(
  z.object({
    id: z.number(),
    title: z.string().nullable(),
    stage_id: z.number().nullable(),
    value: z.union([z.string(), z.number()]).nullable(),
    expected_close_date: custom.date().nullable(),
    weighted_value: z.union([z.string(), z.number()]).nullable(),
    status: z.string().nullable(),
    active: z.boolean().nullable(),
    probability: z.union([z.string(), z.number()]).nullable(),
    update_time: custom.date(),
    add_time: custom.date(),
    deleted: z.boolean().nullable(),
    currency: z.string().nullable(),
    person_id: z.object({ value: z.number() }).nullable(),
    org_id: z.object({ value: z.number() }).nullable(),
    user_id: z.object({ value: z.number() }).nullable(),
  }),
);
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
// Organizations
// -
export const pipedriveOrganizationSchema = custom.addNativeToZodSchema(
  z.object({
    id: z.number(),
    name: z.string().nullable(),
    address_route: z.string().nullable(),
    address_locality: z.string().nullable(),
    address_admin_area_level_1: z.string().nullable(),
    address_postal_code: z.string().nullable(),
    address_country: z.string().nullable(),
    update_time: custom.date(),
    add_time: custom.date(),
    active_flag: z.boolean().nullable(), // isDeleted
    owner_id: z.object({ value: z.number() }).nullable(),
  }),
);
export type PipedriveOrganization = z.infer<typeof pipedriveOrganizationSchema>;
export const pipedriveOrganizationUpsertSchema = z
  .object({
    name: z.string(),
    address: z.string().optional(),
    owner_id: z.number().optional(),
    $native: z.record(z.any()),
  })
  .partial();
export type PipedriveOrganizationCreate = z.infer<
  typeof pipedriveOrganizationUpsertSchema
>;
export type PipedriveOrganizationUpdate = z.infer<
  typeof pipedriveOrganizationUpsertSchema
> & { id: string };

// -
// Notes
// -
export const pipedriveNoteSchema = custom.addNativeToZodSchema(
  z.object({
    id: z.number(),
    add_time: custom.date(),
    update_time: custom.date(),
    content: z.string().nullable(),
    user_id: z.number().nullable(),
    active_flag: z.boolean().nullable(),
    deal_id: z.number().optional().nullable(),
    person_id: z.number().optional().nullable(),
    org_id: z.number().optional().nullable(),
    lead_id: z.number().optional().nullable(),
  }),
);
export type PipedriveNote = z.infer<typeof pipedriveNoteSchema>;

export const pipedriveNoteCreateSchema = z
  .object({
    content: z.string(),
    user_id: z.number(),
    person_id: z.number().optional(),
    deal_id: z.number().optional(),
    org_id: z.number().optional(),
    lead_id: z.number().optional(),
    $native: z.record(z.any()),
  })
  .partial();
export type PipedriveNoteCreate = z.infer<typeof pipedriveNoteCreateSchema>;
export const pipedriveNoteUpdateSchema = z
  .object({
    content: z.string(),
    user_id: z.number(),
    $native: z.record(z.any()),
  })
  .partial();
export type PipedriveNoteUpdate = z.infer<typeof pipedriveNoteUpdateSchema> & {
  id: string;
};

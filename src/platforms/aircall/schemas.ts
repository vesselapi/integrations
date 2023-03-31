import * as custom from '@/sdk/validators';
import { z } from 'zod';
import { aircallUrl } from './actions/validators';

export const aircallPagination = z
  .object({
    count: z.number().nullable(),
    total: z.number().nullable(),
    current_page: z.number().nullable(),
    per_page: z.number().nullable(),
    next_page_link: aircallUrl().nullable(),
    previous_page_link: aircallUrl().nullable(),
  })
  .passthrough();

export type AircallPagination = z.infer<typeof aircallPagination>;

export const aircallUser = z
  .object({
    id: z.number(),
    direct_link: z.string().nullable(),
    name: z.string(),
    email: z.string().nullable(),
    available: z.boolean().nullable(),
    availability_status: z.string().nullable(),
    time_zone: z.string().nullable(),
    language: z.string().nullable(),
    wrap_up_time: z.number().nullable(),
    created_at: custom.date(),
  })
  .passthrough();

export type AircallUser = z.infer<typeof aircallUser>;

export type AircallStartUserCall = { number_id: number | string; to: string };

export const aircallContact = z
  .object({
    id: z.number(),
    direct_link: z.string().nullable(),
    first_name: z.string().nullable(),
    last_name: z.string().nullable(),
    company_name: z.string().nullable(),
    information: z.string().nullable(),
    is_shared: z.boolean().nullable(),
    created_at: custom.timestamp(true),
    updated_at: custom.timestamp(true),
    emails: z
      .array(
        z
          .object({
            id: z.number(),
            label: z.string().nullable(),
            value: z.string(),
          })
          .passthrough(),
      )
      .nullable(),
    phone_numbers: z
      .array(
        z
          .object({
            id: z.number(),
            label: z.string().nullable(),
            value: z.string(),
          })
          .passthrough(),
      )
      .nullable(),
  })
  .passthrough();

export type AircallContact = z.infer<typeof aircallContact>;

export type AircallContactCreate = {
  first_name?: string;
  last_name?: string;
  company_name?: string;
  information?: string;
  emails?: {
    label?: string;
    value: string;
  }[];
  phone_numbers: {
    label?: string;
    value: string;
  }[];
};

export type AircallContactUpdate = {
  first_name?: string;
  last_name?: string;
  company_name?: string;
  information?: string;
};

const aircallNumber = z
  .object({
    id: z.number(),
    name: z.string().nullable(),
    digits: z.string().nullable(),
    created_at: custom.date(),
  })
  .passthrough();

export const aircallCall = z
  .object({
    id: z.number(),
    direct_link: z.string().nullable(),
    direction: z.enum(['inbound', 'outbound']).nullable(),
    status: z.string().nullable(),
    started_at: custom.timestamp(true),
    answered_at: custom.timestamp(true),
    ended_at: custom.timestamp(true),
    duration: z.number().nullable(),
    voicemail: z.string().nullable(),
    recording: z.string().nullable(),
    raw_digits: z.string(),
    user: aircallUser,
    contact: aircallContact.nullable(),
    number: aircallNumber,
    participants: z
      .array(
        z
          .object({
            id: z.number(),
            type: z.enum(['user', 'contact', 'external']),
            name: z.string().nullable(),
            phone_number: z.string().nullable(),
          })
          .passthrough(),
      )
      .optional(),
  })
  .passthrough();

export type AircallCall = z.infer<typeof aircallCall>;

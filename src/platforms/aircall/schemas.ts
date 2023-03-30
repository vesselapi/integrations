import * as custom from '@/sdk/validators';
import { z } from 'zod';

export const aircallPagination = z
  .object({
    count: z.number().nullable(),
    total: z.number().nullable(),
    current_page: z.number().nullable(),
    per_page: z.number().nullable(),
    next_page_link: z.string().nullable(),
    previous_page_link: z.string().nullable(),
  })
  .passthrough();

export type AircallPagination = z.infer<typeof aircallPagination>;

export const aircallUser = z
  .object({
    id: z.number(),
    direct_link: z.string().nullable(),
    name: z.string().nullable(),
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

export type AircallStartUserCall = { number_id: number; to: string };

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
            value: z.string().nullable(),
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
            value: z.string().nullable(),
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
    label: string;
    value: string;
  }[];
  phone_numbers: {
    label: string;
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
    direct_link: z.string().nullable(),
    name: z.string().nullable(),
    number: z.string().nullable(),
    country: z.string().nullable(),
    country_code: z.string().nullable(),
    time_zone: z.string().nullable(),
    open: z.boolean(),
    availability_status: z.literal('custom'),
    is_ivr: z.boolean(),
    live_recording_activated: z.boolean(),
    created_at: custom.timestamp(true),
  })
  .passthrough();

export const aircallCall = z
  .object({
    id: z.number(),
    direct_link: z.string().nullable(),
    direction: z.string().nullable(),
    status: z.string().nullable(),
    missed_call_reason: z.string().nullable(),
    started_at: custom.timestamp(true).nullable(),
    answered_at: custom.timestamp(true).nullable(),
    ended_at: custom.timestamp(true).nullable(),
    duration: z.number().nullable(),
    voicemail: z.string().nullable(),
    recording: z.string().nullable(),
    raw_digits: z.string().nullable(),
    user: aircallUser,
    contact: z.string().nullable(),
    archived: z.boolean().nullable(),
    assigned_to: z.string().nullable(),
    transferred_by: z.string().nullable(),
    transferred_to: z.string().nullable(),
    number: aircallNumber,
  })
  .passthrough();

export type AircallCall = z.infer<typeof aircallCall>;

import { BASE_URL, DEFAULT_PAGE_SIZE } from '@/platforms/salesloft/constants';
import {
  formatUpsertInputWithNative,
  formatUrl,
  makeRequestFactory,
} from '@/sdk/client';
import { shake } from 'radash';
import { z } from 'zod';
import {
  salesloftCadence,
  SalesloftCadenceImport,
  salesloftCadenceImportResponse,
  salesloftCadenceMembership,
  salesloftCustomField,
  SalesloftCustomFieldCreate,
  salesloftEmail,
  salesloftEmailBody,
  salesloftPerson,
  SalesloftPersonCreate,
  SalesloftPersonUpdate,
  salesloftResponseMetadata,
  salesloftUser,
} from './schemas';

const request = makeRequestFactory(async (auth, options) => ({
  ...options,
  url: formatUrl(BASE_URL, options.url),
  headers: {
    ...options.headers,
    Authorization: `Bearer ${await auth.getToken()}`,
  },
}));

export const client = {
  people: {
    list: request(
      ({
        email_addresses,
        per_page = DEFAULT_PAGE_SIZE,
        page,
        tag_id,
        cadence_id,
      }: {
        email_addresses?: string[];
        per_page?: number;
        page?: number;
        tag_id?: string;
        cadence_id?: string;
      }) => ({
        url: `/people.json`,
        method: 'GET',
        query: shake({
          email_addresses,
          per_page,
          page,
          tag_id,
          cadence_id,
        }),
        schema: z.object({
          data: z.array(salesloftPerson),
          metadata: salesloftResponseMetadata,
        }),
      }),
    ),
    find: request(({ id }: { id: string }) => ({
      url: `/people/${id}.json`,
      method: 'GET',
      schema: z.object({
        data: salesloftPerson,
      }),
    })),
    create: request((person: SalesloftPersonCreate) => ({
      url: `/people.json`,
      method: 'POST',
      json: formatUpsertInputWithNative(person),
      schema: z.object({
        data: salesloftPerson,
      }),
    })),
    update: request((person: SalesloftPersonUpdate & { id: string }) => ({
      url: `/people/${person.id}.json`,
      method: 'PUT',
      json: formatUpsertInputWithNative(person),
      schema: z.object({
        data: salesloftPerson,
      }),
    })),
  },
  cadences: {
    list: request(
      ({
        per_page = DEFAULT_PAGE_SIZE,
        page,
      }: {
        per_page?: number;
        page?: number;
      }) => ({
        url: `/cadences.json`,
        method: 'GET',
        query: shake({
          per_page,
          page,
        }),
        schema: z.object({
          data: z.array(salesloftCadence),
          metadata: salesloftResponseMetadata,
        }),
      }),
    ),
    import: request((cadence: SalesloftCadenceImport) => ({
      url: `/cadence_imports.json`,
      method: 'POST',
      json: cadence,
      schema: salesloftCadenceImportResponse,
    })),
  },
  cadenceMemberships: {
    create: request(
      ({
        cadence_id,
        person_id,
        user_id,
        $native,
      }: {
        cadence_id: string;
        person_id: string;
        user_id: string;
        $native?: Record<string, unknown>;
      }) => ({
        url: `/cadence_memberships.json`,
        method: 'POST',
        json: shake({
          cadence_id,
          person_id,
          user_id,
          ...($native ?? {}),
        }),
        schema: z.object({
          data: salesloftCadenceMembership,
        }),
      }),
    ),
  },
  users: {
    find: request(({ id }: { id: string }) => ({
      url: `/users/${id}.json`,
      method: 'GET',
      schema: z.object({
        data: salesloftUser,
      }),
    })),
    list: request(
      ({
        per_page = DEFAULT_PAGE_SIZE,
        page,
      }: {
        per_page?: number;
        page?: number;
      }) => ({
        url: `/users.json`,
        method: 'GET',
        query: shake({
          per_page,
          page,
        }),
        schema: z.object({
          data: z.array(salesloftUser),
          metadata: salesloftResponseMetadata,
        }),
      }),
    ),
  },
  emails: {
    list: request(
      ({
        per_page = DEFAULT_PAGE_SIZE,
        page,
        person_id,
        cadence_id,
      }: {
        per_page?: number;
        page?: number;
        person_id?: string;
        cadence_id?: string;
      }) => ({
        url: `/activities/emails.json`,
        method: 'GET',
        query: shake({
          per_page,
          page,
          person_id,
          cadence_id,
        }),
        schema: z.object({
          data: z.array(salesloftEmail),
          metadata: salesloftResponseMetadata,
        }),
      }),
    ),
    find: request(({ id }: { id: string }) => ({
      url: `/activities/emails/${id}.json`,
      method: 'GET',
      schema: z.object({
        data: salesloftEmail,
      }),
    })),
  },
  emailBodies: {
    find: request(({ id }: { id: string }) => ({
      url: `/mime_email_payloads/${id}.json`,
      method: 'GET',
      schema: z.object({
        data: salesloftEmailBody,
      }),
    })),
  },
  customFields: {
    list: request(
      ({
        per_page = DEFAULT_PAGE_SIZE,
        page,
        field_type,
      }: {
        per_page?: number;
        page?: number;
        field_type?: string;
      }) => ({
        url: `/custom_fields.json`,
        method: 'GET',
        query: shake({
          per_page,
          page,
          field_type,
        }),
        schema: z.object({
          data: z.array(salesloftCustomField),
          metadata: salesloftResponseMetadata,
        }),
      }),
    ),
    create: request((customField: SalesloftCustomFieldCreate) => ({
      url: `/custom_fields.json`,
      method: 'POST',
      json: formatUpsertInputWithNative(customField),
      schema: z.object({
        data: salesloftCustomField,
      }),
    })),
  },
  passthrough: request.passthrough(),
};

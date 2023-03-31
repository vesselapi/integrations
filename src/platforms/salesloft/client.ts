import { makeRequestFactory } from '@/sdk/client';
import { shake } from 'radash';
import { z } from 'zod';
import { BASE_URL, DEFAULT_PAGE_SIZE } from './constants';
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

const request = makeRequestFactory(
  BASE_URL,
  ({ auth, fullUrl, method, headers, json }) =>
    async () =>
      await fetch(fullUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await auth.getToken()}`,
          ...headers,
        },
        body: json ? JSON.stringify(json) : undefined,
      }),
);

export const client = {
  people: {
    list: request({
      url: () => `/people.json`,
      method: 'get',
      query: ({
        email_addresses,
        per_page = DEFAULT_PAGE_SIZE,
        page,
      }: {
        email_addresses?: string[];
        per_page?: number;
        page?: number;
      }) =>
        shake({
          email_addresses,
          per_page,
          page,
        }),
      schema: z
        .object({
          data: z.array(salesloftPerson),
          metadata: salesloftResponseMetadata,
        })
        .passthrough(),
    }),
    find: request({
      url: ({ id }: { id: string }) => `/people/${id}.json`,
      method: 'get',
      schema: z
        .object({
          data: salesloftPerson,
        })
        .passthrough(),
    }),
    create: request({
      url: () => `/people.json`,
      method: 'post',
      json: (person: SalesloftPersonCreate) => person,
      schema: z
        .object({
          data: salesloftPerson,
        })
        .passthrough(),
    }),
    update: request({
      url: ({ id }: { id: string }) => `/people/${id}.json`,
      method: 'put',
      json: (person: SalesloftPersonUpdate) => person,
      schema: z
        .object({
          data: salesloftPerson,
        })
        .passthrough(),
    }),
  },
  cadences: {
    list: request({
      url: () => `/cadences.json`,
      method: 'get',
      query: ({
        per_page = DEFAULT_PAGE_SIZE,
        page,
      }: {
        per_page?: number;
        page?: number;
      }) =>
        shake({
          per_page,
          page,
        }),
      schema: z
        .object({
          data: z.array(salesloftCadence),
          metadata: salesloftResponseMetadata,
        })
        .passthrough(),
    }),
    import: request({
      url: () => `/cadence_imports.json`,
      method: 'post',
      json: (cadence: SalesloftCadenceImport) => cadence,
      schema: salesloftCadenceImportResponse,
    }),
  },
  cadenceMemberships: {
    create: request({
      url: () => `/cadence_memberships.json`,
      method: 'post',
      json: ({
        cadence_id,
        person_id,
        user_id,
      }: {
        cadence_id: string;
        person_id: string;
        user_id: string;
      }) => shake({ cadence_id, person_id, user_id }),
      schema: z
        .object({
          data: salesloftCadenceMembership,
        })
        .passthrough(),
    }),
  },
  users: {
    find: request({
      url: ({ id }: { id: string }) => `/users/${id}.json`,
      method: 'get',
      schema: z
        .object({
          data: salesloftUser,
        })
        .passthrough(),
    }),
    list: request({
      url: () => `/users.json`,
      method: 'get',
      query: ({
        per_page = DEFAULT_PAGE_SIZE,
        page,
      }: {
        per_page?: number;
        page?: number;
      }) =>
        shake({
          per_page,
          page,
        }),
      schema: z
        .object({
          data: z.array(salesloftUser),
          metadata: salesloftResponseMetadata,
        })
        .passthrough(),
    }),
  },
  emails: {
    list: request({
      url: () => `/activities/emails.json`,
      method: 'get',
      query: ({
        per_page = DEFAULT_PAGE_SIZE,
        page,
        person_id,
        cadence_id,
      }: {
        per_page?: number;
        page?: number;
        person_id?: string;
        cadence_id?: string;
      }) =>
        shake({
          per_page,
          page,
          person_id,
          cadence_id,
        }),
      schema: z
        .object({
          data: z.array(salesloftEmail),
          metadata: salesloftResponseMetadata,
        })
        .passthrough(),
    }),
    find: request({
      url: ({ id }: { id: string }) => `/activities/emails/${id}.json`,
      method: 'get',
      schema: z
        .object({
          data: salesloftEmailBody,
        })
        .passthrough(),
    }),
  },
  emailBodies: {
    find: request({
      url: ({ id }: { id: string }) => `/mime_email_payloads/${id}.json`,
      method: 'get',
      schema: z
        .object({
          data: z.string(),
        })
        .passthrough(),
    }),
  },
  customFields: {
    list: request({
      url: () => `/custom_fields.json`,
      method: 'get',
      query: ({
        per_page = DEFAULT_PAGE_SIZE,
        page,
        field_type,
      }: {
        per_page?: number;
        page?: number;
        field_type?: string;
      }) =>
        shake({
          per_page,
          page,
          field_type,
        }),
      schema: z
        .object({
          data: z.array(salesloftCustomField),
          metadata: salesloftResponseMetadata,
        })
        .passthrough(),
    }),
    create: request({
      url: () => `/custom_fields.json`,
      method: 'post',
      json: (customField: SalesloftCustomFieldCreate) => customField,
      schema: z
        .object({
          data: salesloftCustomField,
        })
        .passthrough(),
    }),
  },
  passthrough: request({
    url: ({ url }: { url: `${typeof BASE_URL}/${string}` | `/${string}` }) =>
      url,
    method: ({
      method,
    }: {
      method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    }) => method,
    query: ({ query }: { query?: Record<string, string> }) => query ?? {},
    json: ({ body }: { body?: Record<string, unknown> }) => body ?? {},
    schema: z.any(),
  }),
};

export { BASE_URL };

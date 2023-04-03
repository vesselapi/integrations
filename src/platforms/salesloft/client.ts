import { makeRequestFactory } from '@/sdk/client';
import { shake } from 'radash';
import { z } from 'zod';
import { DEFAULT_PAGE_SIZE } from './constants';
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
      }: {
        email_addresses?: string[];
        per_page?: number;
        page?: number;
      }) => ({
        url: `/people.json`,
        method: 'get',
        query: shake({
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
    ),
    find: request(({ id }: { id: string }) => ({
      url: `/people/${id}.json`,
      method: 'get',
      schema: z
        .object({
          data: salesloftPerson,
        })
        .passthrough(),
    })),
    create: request((person: SalesloftPersonCreate) => ({
      url: `/people.json`,
      method: 'post',
      json: person,
      schema: z
        .object({
          data: salesloftPerson,
        })
        .passthrough(),
    })),
    update: request((person: SalesloftPersonUpdate & { id: string }) => ({
      url: `/people/${person.id}.json`,
      method: 'put',
      json: person,
      schema: z
        .object({
          data: salesloftPerson,
        })
        .passthrough(),
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
        method: 'get',
        query: shake({
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
    ),
    import: request((cadence: SalesloftCadenceImport) => ({
      url: `/cadence_imports.json`,
      method: 'post',
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
      }: {
        cadence_id: string;
        person_id: string;
        user_id: string;
      }) => ({
        url: `/cadence_memberships.json`,
        method: 'post',
        json: shake({ cadence_id, person_id, user_id }),
        schema: z
          .object({
            data: salesloftCadenceMembership,
          })
          .passthrough(),
      }),
    ),
  },
  users: {
    find: request(({ id }: { id: string }) => ({
      url: `/users/${id}.json`,
      method: 'get',
      schema: z
        .object({
          data: salesloftUser,
        })
        .passthrough(),
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
        method: 'get',
        query: shake({
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
        method: 'get',
        query: shake({
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
    ),
    find: request(({ id }: { id: string }) => ({
      url: `/activities/emails/${id}.json`,
      method: 'get',
      schema: z
        .object({
          data: salesloftEmail,
        })
        .passthrough(),
    })),
  },
  emailBodies: {
    find: request(({ id }: { id: string }) => ({
      url: `/mime_email_payloads/${id}.json`,
      method: 'get',
      schema: z
        .object({
          data: salesloftEmailBody,
        })
        .passthrough(),
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
        method: 'get',
        query: shake({
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
    ),
    create: request((customField: SalesloftCustomFieldCreate) => ({
      url: `/custom_fields.json`,
      method: 'post',
      json: customField,
      schema: z
        .object({
          data: salesloftCustomField,
        })
        .passthrough(),
    })),
  },
  passthrough: request.passthrough(),
};

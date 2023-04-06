import { makeRequestFactory } from '@/sdk/client';
import { shake } from 'radash';
import { z } from 'zod';
import { BASE_URL, DEFAULT_PAGE_SIZE } from './constants';
import {
  aircallCall,
  aircallContact,
  AircallContactCreate,
  AircallContactUpdate,
  aircallPagination,
  AircallStartUserCall,
  aircallUser,
} from './schemas';

const base64 = (str: string) => Buffer.from(str).toString('base64');

const request = makeRequestFactory(async (auth, options) => {
  const { answers } = await auth.getMetadata();
  return {
    ...options,
    url: `${BASE_URL}${options.url}`,
    headers: {
      ...options.headers,
      Authorization:
        auth.type === 'oauth2'
          ? `Bearer ${await auth.getToken()}`
          : `Basic ${base64(`${answers['api-id']}:${await auth.getToken()}`)}`,
    },
  };
});

export const client = {
  users: {
    find: request(({ id }: { id: number | string }) => ({
      url: `/users/${id}`,
      method: 'GET',
      schema: z.object({
        user: aircallUser,
      }),
    })),
    list: request(
      ({
        next_page_link,
        from,
        per_page = DEFAULT_PAGE_SIZE,
      }: {
        next_page_link?: `${typeof BASE_URL}/${string}`;
        from?: string;
        per_page?: number;
      }) => ({
        url: next_page_link ?? `/users`,
        method: 'GET',
        query: shake({ from, per_page: `${per_page}` }),
        schema: z.object({
          users: z.array(aircallUser),
          meta: aircallPagination,
        }),
      }),
    ),
    startCall: request(
      (call: { id: string | number } & AircallStartUserCall) => ({
        url: `/users/${call.id}/calls`,
        method: 'POST',
        json: call,
        schema: z.any(),
      }),
    ),
  },
  calls: {
    find: request(({ id }: { id: number | string }) => ({
      url: `/calls/${id}`,
      method: 'GET',
      schema: z.object({
        call: aircallCall,
      }),
    })),
    list: request(
      ({
        next_page_link,
        from,
        per_page = DEFAULT_PAGE_SIZE,
      }: {
        next_page_link?: `${typeof BASE_URL}/${string}`;
        from?: string;
        per_page?: number;
      }) => ({
        url: next_page_link ?? `/calls`,
        method: 'GET',
        query: shake({ from, per_page: `${per_page}` }),
        schema: z.object({
          calls: z.array(aircallCall),
          meta: aircallPagination,
        }),
      }),
    ),
  },
  contacts: {
    find: request(({ id }: { id: number | string }) => ({
      url: `/contacts/${id}`,
      method: 'GET',
      schema: z.object({
        contact: aircallContact,
      }),
    })),
    list: request(
      ({
        next_page_link,
        from,
        per_page = DEFAULT_PAGE_SIZE,
      }: {
        next_page_link?: `${typeof BASE_URL}/${string}`;
        from?: string;
        per_page?: number;
      }) => ({
        url: next_page_link ?? `/contacts`,
        method: 'GET',
        query: shake({ from, per_page: `${per_page}` }),
        schema: z.object({
          contacts: z.array(aircallContact),
          meta: aircallPagination,
        }),
      }),
    ),
    create: request((contact: AircallContactCreate) => ({
      url: `/contacts`,
      method: 'POST',
      json: contact,
      schema: z.object({
        contact: aircallContact,
      }),
    })),
    update: request(
      (contact: { id: string | number } & AircallContactUpdate) => ({
        url: `/contacts/${contact.id}`,
        method: 'POST',
        json: contact,
        schema: z.object({
          contact: aircallContact,
        }),
      }),
    ),
  },
  passthrough: request.passthrough(),
};

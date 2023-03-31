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

const request = makeRequestFactory(
  BASE_URL,
  ({ auth, fullUrl, method, headers, json }) =>
    async () =>
      await fetch(fullUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            auth.type === 'oauth2'
              ? `Bearer ${await auth.getTokenString()}`
              : `Basic ${base64(await auth.getTokenString())}`,
          ...headers,
        },
        body: json ? JSON.stringify(json) : undefined,
      }),
);

export const client = {
  users: {
    find: request({
      url: ({ id }: { id: number | string }) => `/users/${id}`,
      method: 'get',
      schema: z
        .object({
          user: aircallUser,
        })
        .passthrough(),
    }),
    list: request({
      url: ({
        next_page_link,
      }: {
        next_page_link?: `${typeof BASE_URL}/${string}`;
      }) => next_page_link ?? `/users`,
      method: 'get',
      query: ({
        from,
        per_page = DEFAULT_PAGE_SIZE,
      }: {
        from?: string;
        per_page?: number;
      }) => shake({ from, per_page: `${per_page}` }),
      schema: z
        .object({
          users: z.array(aircallUser),
          meta: aircallPagination,
        })
        .passthrough(),
    }),
    startCall: request({
      url: ({ id }: { id: string | number }) => `/users/${id}/calls`,
      method: 'post',
      json: (call: AircallStartUserCall) => call,
      schema: z.any(),
    }),
  },
  calls: {
    find: request({
      url: ({ id }: { id: number | string }) => `/calls/${id}`,
      method: 'get',
      schema: z
        .object({
          call: aircallCall,
        })
        .passthrough(),
    }),
    list: request({
      url: ({
        next_page_link,
      }: {
        next_page_link?: `${typeof BASE_URL}/${string}`;
      }) => next_page_link ?? `/calls`,
      method: 'get',
      query: ({
        from,
        per_page = DEFAULT_PAGE_SIZE,
      }: {
        from?: string;
        per_page?: number;
      }) => shake({ from, per_page: `${per_page}` }),
      schema: z
        .object({
          calls: z.array(aircallCall),
          meta: aircallPagination,
        })
        .passthrough(),
    }),
  },
  contacts: {
    find: request({
      url: ({ id }: { id: number | string }) => `/contacts/${id}`,
      method: 'get',
      schema: z
        .object({
          contact: aircallContact,
        })
        .passthrough(),
    }),
    list: request({
      url: ({
        next_page_link,
      }: {
        next_page_link?: `${typeof BASE_URL}/${string}`;
      }) => next_page_link ?? `/contacts`,
      method: 'get',
      query: ({
        from,
        per_page = DEFAULT_PAGE_SIZE,
      }: {
        from?: string;
        per_page?: number;
      }) => shake({ from, per_page: `${per_page}` }),
      schema: z
        .object({
          contacts: z.array(aircallContact),
          meta: aircallPagination,
        })
        .passthrough(),
    }),
    create: request({
      url: () => `/contacts`,
      method: 'post',
      json: (contact: AircallContactCreate) => contact,
      schema: z
        .object({
          contact: aircallContact,
        })
        .passthrough(),
    }),
    update: request({
      url: ({ id }: { id: string | number }) => `/contacts/${id}`,
      method: 'post',
      json: (contact: AircallContactUpdate) => contact,
      schema: z
        .object({
          contact: aircallContact,
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
    json: ({ body }: { body?: Record<string, unknown> }) => body,
    schema: z.any(),
  }),
};

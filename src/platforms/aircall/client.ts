import { makeRequestFactory } from '@/sdk/client';
import { shake } from 'radash';
import { z } from 'zod';
import {
  aircallCall,
  aircallContact,
  AircallContactCreate,
  AircallContactUpdate,
  aircallPagination,
  AircallStartUserCall,
  aircallUser,
} from './schema';

const BASE_URL = 'https://api.aircall.io/v1';
const DEFAULT_PAGE_SIZE = 100;

const request = makeRequestFactory(
  BASE_URL,
  ({ auth, fullUrl, method, headers, json }) =>
    async () =>
      await fetch(fullUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await auth.getTokenString()}`,
          ...headers,
        },
        body: json ? JSON.stringify(json) : undefined,
      }),
);

export const client = {
  users: {
    find: request({
      url: ({ id }: { id: string }) => `/users/${id}`,
      method: 'get',
      schema: z
        .object({
          user: aircallUser,
        })
        .passthrough(),
    }),
    list: request({
      url: () => `/users`,
      method: 'get',
      query: ({
        from,
        page = 0,
        per_page = DEFAULT_PAGE_SIZE,
      }: {
        from?: string;
        page?: number;
        per_page?: number;
      }) => shake({ from, page: `${page}`, per_page: `${per_page}` }),
      schema: z.intersection(
        z
          .object({
            users: z.array(aircallUser),
          })
          .passthrough(),
        aircallPagination,
      ),
    }),
    startCall: request({
      url: ({ id }: { id: string }) => `/users/${id}/calls`,
      method: 'post',
      json: (call: AircallStartUserCall) => call,
      schema: z.any(),
    }),
  },
  calls: {
    find: request({
      url: ({ id }: { id: string }) => `/calls/${id}`,
      method: 'get',
      schema: z
        .object({
          call: aircallCall,
        })
        .passthrough(),
    }),
    list: request({
      url: () => `/calls`,
      method: 'get',
      query: ({
        from,
        page = 0,
        per_page = DEFAULT_PAGE_SIZE,
      }: {
        from?: string;
        page?: number;
        per_page?: number;
      }) => shake({ from, page: `${page}`, per_page: `${per_page}` }),
      schema: z.intersection(
        z
          .object({
            calls: z.array(aircallCall),
          })
          .passthrough(),
        aircallPagination,
      ),
    }),
  },
  contacts: {
    find: request({
      url: ({ id }: { id: string }) => `/contacts/${id}`,
      method: 'get',
      schema: z
        .object({
          contact: aircallContact,
        })
        .passthrough(),
    }),
    list: request({
      url: () => `/contacts`,
      method: 'get',
      query: ({
        from,
        page = 0,
        per_page = DEFAULT_PAGE_SIZE,
      }: {
        from?: string;
        page?: number;
        per_page?: number;
      }) => shake({ from, page: `${page}`, per_page: `${per_page}` }),
      schema: z.intersection(
        z
          .object({
            calls: z.array(aircallContact),
          })
          .passthrough(),
        aircallPagination,
      ),
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
      url: ({ id }: { id: string }) => `/contacts/${id}`,
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
    json: ({ body }: { body?: Record<string, unknown> }) => body ?? {},
    schema: z.any(),
  }),
};

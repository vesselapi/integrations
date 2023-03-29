
import { makeRequestFactory } from '@/sdk/client';
import { mapKeys, shake } from 'radash';
import { z } from 'zod';

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
      schema: z.any(),
    }),
    list: request({
      url: () => `/users`,
      method: 'get',
      schema: z.any()
    }),
    startCall: request({
      url: ({ id }: { id: string }) => `/users/${id}/calls`,
      method: 'post',
      json: ({ number_id, to }: { number_id: number; to: string }) => ({
        number_id,
        to,
      }),
      schema: z.any()
    }),
  },
  calls: {
    find: request({
      url: ({ id }: { id: string }) => `/calls/${id}`,
      method: 'get',
      schema: z.any(),
    }),
    list: request({
      url: () => `/calls`,
      method: 'get',
      schema: z.any()
    }),
  },
  contacts: {
    find: request({
      url: ({ id }: { id: string }) => `/users/${id}`,
      method: 'get',
      schema: z.any(),
    }),
    list: request({
      url: () => `/users`,
      method: 'get',
      schema: z.any()
    }),
    create: request({
      url: () => `/users`,
      method: 'post',
      json: (contact: { first_name: string; last_name: string; phone_number: string; company: string; tags: string[] }) => contact,
      schema: z.any()
    }),
    update: request({
      url: ({ id}: { id: string}) => `/users/${id}`,
      method: 'post',
      json: (contact: { first_name: string; last_name: string; company_name: string; information: string }) => contact,
      schema: z.any()
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

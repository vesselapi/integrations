import { makeRequestFactory } from '@/sdk/client';
import * as z from 'zod';
import {
  dialpadCallSchema,
  DialpadClient,
  dialpadContactSchema,
  DialpadModules,
  dialpadUserSchema,
  listResponseSchema,
} from './schemas';

const API_DOMAIN = 'https://dialpad.com/api';
const API_VERSION = 'v2';
const BASE_URL = `${API_DOMAIN}/${API_VERSION}`;

const request = makeRequestFactory(
  BASE_URL,
  ({ auth, fullUrl, method, headers, json }) =>
    async () =>
      await fetch(fullUrl, {
        method,
        headers: {
          Authorization: `Bearer ${auth.getToken()}`,
          'Content-Type': 'application/json',
          ...headers,
        },
        ...(json ? { body: JSON.stringify(json) } : {}),
      }),
);

const makeClient = (): DialpadClient => {
  const findObject = (module: DialpadModules, schema: z.ZodSchema) =>
    request({
      url: ({ id }: { id: string }) => `/${module}/${id}`,
      method: 'get',
      schema,
    });

  const listObject = (module: DialpadModules, schema: z.ZodSchema) =>
    request({
      url: () => `/${module}`,
      method: 'get',
      query: ({ page, per_page }: { page?: number; per_page?: number }) => ({
        page: `${page ?? 1}`,
        per_page: `${per_page ?? 100}`,
      }),
      schema,
    });

  return {
    users: {
      find: findObject('users', dialpadUserSchema),
      list: listObject('users', listResponseSchema(dialpadUserSchema)),
    },
    contacts: {
      find: findObject('contacts', dialpadContactSchema),
      list: listObject('contacts', listResponseSchema(dialpadContactSchema)),
    },
    calls: {
      find: findObject('calls', dialpadCallSchema),
      list: listObject('calls', listResponseSchema(dialpadCallSchema)),
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
};

export default makeClient();

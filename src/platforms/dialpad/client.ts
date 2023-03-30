import { makeRequestFactory } from '@/sdk/client';
import * as z from 'zod';
import { API_DOMAIN, API_VERSION } from './constants';
import {
  dialpadCallSchema,
  DialpadClient,
  dialpadContactSchema,
  DialpadModules,
  dialpadUserSchema,
  listResponseSchema,
} from './schemas';

const BASE_URL = `${API_DOMAIN}/${API_VERSION}`;

const request = makeRequestFactory(
  BASE_URL,
  ({ auth, fullUrl, method, headers, json }) =>
    async () =>
      await fetch(fullUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${await auth.getTokenString()}`,
          ...headers,
        },
        body: json ? JSON.stringify(json) : undefined,
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
      query: ({ cursor }: { cursor?: string }): Record<string, string> =>
        cursor ? { cursor } : {},
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

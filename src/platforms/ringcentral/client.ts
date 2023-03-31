import { makeRequestFactory } from '@/sdk/client';
import { omit } from 'radash';
import * as z from 'zod';
import { API_DOMAIN, API_VERSION } from './constants';
import {
  ListObjectInput,
  listResponseSchema,
  ringcentralCallLogSchema,
  RingcentralContactCreate,
  ringcentralContactSchema,
  RingcentralContactUpdate,
  ringcentralExtensionSchema,
  RingcentralRingOutStart,
  ringcentralRingOutStatusSchema,
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
          Authorization: `Bearer ${await auth.getToken()}`,
          ...headers,
        },
        body: json ? JSON.stringify(json) : undefined,
      }),
);

const findObject = (endpoint: string, schema: z.ZodSchema) =>
  request({
    url: ({ id }: { id: string }) => `/${endpoint}/${id}`,
    method: 'get',
    schema,
  });

const listObject = (endpoint: string, schema: z.ZodSchema) =>
  request({
    url: () => `/${endpoint}`,
    method: 'get',
    query: ({ page, perPage }: ListObjectInput): Record<string, string> => ({
      ...(page ? { page: `${page}` } : {}),
      ...(perPage ? { perPage: `${perPage}` } : {}),
    }),
    schema,
  });

const createObject = <T extends Record<string, unknown>>(
  endpoint: string,
  schema: z.ZodSchema,
) =>
  request({
    url: () => `/${endpoint}`,
    method: 'post',
    schema,
    json: (body: T) => body,
  });

const updateObject = <T extends Record<string, unknown>>(
  endpoint: string,
  schema: z.ZodSchema,
) =>
  request({
    url: ({ id }: { id: string }) => `/${endpoint}/${id}`,
    method: 'put',
    schema,
    json: (body: T) => omit(body, ['id']),
  });

const makeClient = () => {
  return {
    extensions: {
      find: findObject('account/~/extension', ringcentralExtensionSchema),
      list: listObject(
        'account/~/extension',
        listResponseSchema(ringcentralExtensionSchema),
      ),
      ringout: request({
        url: ({ extensionId }: { extensionId: string }) =>
          `account/~/extension/${extensionId}/ring-out`,
        method: 'post',
        json: (body: RingcentralRingOutStart) => omit(body, ['extensionId']),
        schema: ringcentralRingOutStatusSchema,
      }),
    },
    callLogs: {
      find: findObject('account/~/call-log', ringcentralCallLogSchema),
      list: listObject(
        'account/~/call-log',
        listResponseSchema(ringcentralCallLogSchema),
      ),
    },
    contacts: {
      find: findObject(
        'account/~/extension/~/address-book/contact',
        ringcentralContactSchema,
      ),
      list: listObject(
        'account/~/extension/~/address-book/contact',
        listResponseSchema(ringcentralContactSchema),
      ),
      create: createObject<RingcentralContactCreate>(
        'account/~/extension/~/address-book/contact',
        ringcentralContactSchema,
      ),
      update: updateObject<RingcentralContactUpdate>(
        'account/~/extension/~/address-book/contact',
        ringcentralContactSchema,
      ),
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

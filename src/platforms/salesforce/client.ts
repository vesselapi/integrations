import { makeRequestFactory } from '@/sdk/client';
import { z } from 'zod';
import { MAX_QUERY_PAGE_SIZE } from './constants';
import {
  salesforceContact,
  salesforceList,
  SalesforceSupportedObjectType,
  salesforceUser,
} from './schemas';

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

const queryBuilder = {
  list: ({
    objectType,
    cursor,
    relationalSelect,
    limit = MAX_QUERY_PAGE_SIZE,
  }: {
    objectType: SalesforceSupportedObjectType;
    cursor?: string;
    relationalSelect?: string;
    limit?: number;
  }) => {
    const select =
      'SELECT FIELDS(ALL)' + (relationalSelect ? `, ${relationalSelect}` : '');
    return `
    ${select}
    FROM ${objectType}
    WHERE Id < ${cursor}
    ORDER BY Id DESC
    LIMIT ${limit}
  `;
  },
};

const makeClient = () => {
  const query = {
    list: <T extends z.ZodType>({
      schema,
      objectType,
      relationalSelect,
    }: {
      schema: T;
      objectType: SalesforceSupportedObjectType;
      relationalSelect?: string;
    }) =>
      request({
        url: () => `/query`,
        method: 'get',
        schema: z.object({
          records: z.array(schema),
          totalSize: z.number(),
        }),
        query: ({ cursor }: { cursor: string }) => ({
          query: queryBuilder.list({
            objectType,
            cursor,
            relationalSelect,
          }),
        }),
      }),
  };
  return {
    users: {
      get: request({
        url: ({ id }: { id: number }) => `/sobjects/User/${id}/`,
        method: 'get',
        schema: salesforceUser,
      }),
      list: query.list({
        objectType: 'User',
        schema: salesforceUser,
      }),
    },
    contacts: {
      get: request({
        url: ({ id }: { id: number }) => `/sobjects/Contact/${id}/`,
        method: 'get',
        schema: salesforceContact,
      }),
      list: query.list({
        objectType: 'Contact',
        schema: salesforceContact,
      }),
    },
    lists: {
      get: request({
        url: ({ id }: { id: number }) => `/sobjects/List/${id}/`,
        method: 'get',
        schema: salesforceList,
      }),
      list: query.list({
        objectType: 'List',
        schema: salesforceList,
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
};

export default makeClient();

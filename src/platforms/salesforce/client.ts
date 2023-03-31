import { makeRequestFactory } from '@/sdk/client';
import { z } from 'zod';
import { MAX_QUERY_PAGE_SIZE } from './constants';
import {
  salesforceContact,
  SalesforceContactCreate,
  SalesforceContactUpdate,
  salesforceListView,
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
          Authorization: `Bearer ${await auth.getToken()}`,
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
    cursor?: number;
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
      query: ({ cursor }: { cursor: number }) => ({
        query: queryBuilder.list({
          objectType,
          cursor,
          relationalSelect,
        }),
      }),
    }),
};

export const client = {
  users: {
    get: request({
      url: ({ Id }: { Id: number }) => `/sobjects/User/${Id}/`,
      method: 'get',
      schema: salesforceUser.passthrough(),
    }),
    list: query.list({
      objectType: 'User',
      schema: salesforceUser.passthrough(),
    }),
  },
  contacts: {
    get: request({
      url: ({ Id }: { Id: number }) => `/sobjects/Contact/${Id}/`,
      method: 'get',
      schema: salesforceContact.passthrough(),
    }),
    list: query.list({
      objectType: 'Contact',
      schema: salesforceContact.passthrough(),
    }),
    create: request({
      url: () => `/sobjects/Contact`,
      method: 'post',
      json: (contact: SalesforceContactCreate) => contact,
      schema: salesforceContact.passthrough(),
    }),
    update: request({
      url: ({ Id }: { Id: number }) => `/sobjects/Contact/${Id}/`,
      method: 'patch',
      json: (contact: SalesforceContactUpdate) => contact,
      schema: salesforceContact.passthrough(),
    }),
  },
  lists: {
    get: request({
      url: ({ Id }: { Id: number }) => `/sobjects/List/${Id}/`,
      method: 'get',
      schema: salesforceListView.passthrough(),
    }),
    list: query.list({
      objectType: 'ListView',
      schema: salesforceListView.passthrough(),
    }),
  },
  passthrough: request({
    url: ({ url }: { url: `/${string}` }) => url,
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

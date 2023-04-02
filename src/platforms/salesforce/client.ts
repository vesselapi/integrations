import { HttpsUrl } from '@/sdk';
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

const request = makeRequestFactory(async (auth, options) => {
  if (auth.type === 'oauth2') {
    const { oauthResponse } = await auth.getMetadata();
    const instanceUrl = oauthResponse.instance_url as HttpsUrl;
    return {
      ...options,
      url: `${instanceUrl}/${options.url}`,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${await auth.getToken()}`,
      },
    };
  } else {
    throw new Error('Salesforce only supports OAuth2 authentication');
  }
});

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
    request(({ cursor }: { cursor: number }) => ({
      url: `/query`,
      method: 'get',
      schema: z
        .object({
          records: z.array(schema),
          totalSize: z.number(),
        })
        .passthrough(),
      query: {
        query: queryBuilder.list({
          objectType,
          cursor,
          relationalSelect,
        }),
      },
    })),
};

export const client = {
  users: {
    get: request(({ Id }: { Id: number }) => ({
      url: `/sobjects/User/${Id}/`,
      method: 'get',
      schema: salesforceUser.passthrough(),
    })),
    list: query.list({
      objectType: 'User',
      schema: salesforceUser.passthrough(),
    }),
  },
  contacts: {
    get: request(({ Id }: { Id: number }) => ({
      url: `/sobjects/Contact/${Id}/`,
      method: 'get',
      schema: salesforceContact.passthrough(),
    })),
    list: query.list({
      objectType: 'Contact',
      schema: salesforceContact.passthrough(),
    }),
    create: request((contact: SalesforceContactCreate) => ({
      url: `/sobjects/Contact`,
      method: 'post',
      json: contact,
      schema: salesforceContact.passthrough(),
    })),
    update: request((contact: SalesforceContactUpdate) => ({
      url: `/sobjects/Contact/${contact.Id}/`,
      method: 'patch',
      json: contact,
      schema: salesforceContact.passthrough(),
    })),
  },
  lists: {
    get: request(({ Id }: { Id: number }) => ({
      url: `/sobjects/List/${Id}/`,
      method: 'get',
      schema: salesforceListView.passthrough(),
    })),
    list: query.list({
      objectType: 'ListView',
      schema: salesforceListView.passthrough(),
    }),
  },
  passthrough: request(
    ({
      url,
      method,
      query,
      body,
    }: {
      url: `/${string}`;
      method: 'get' | 'post' | 'put' | 'delete' | 'patch';
      query?: Record<string, string>;
      body?: Record<string, unknown>;
    }) => ({
      url,
      method,
      query: query ?? {},
      json: body ?? {},
      schema: z.any(),
    }),
  ),
};

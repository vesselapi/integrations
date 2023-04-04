import { HttpsUrl } from '@/sdk';
import { makeRequestFactory } from '@/sdk/client';
import { z } from 'zod';
import { MAX_QUERY_PAGE_SIZE } from './constants';
import {
  salesforceContact,
  SalesforceContactCreate,
  SalesforceContactUpdate,
  salesforceListView,
  salesforceListViewResult,
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
  listListView: ({
    objectType,
    cursor,
    limit = MAX_QUERY_PAGE_SIZE,
  }: {
    objectType?: string;
    cursor?: number;
    limit?: number;
  }) => {
    const getWhere = () => {
      if (!cursor) {
        return '';
      }
      return (
        `WHERE Id < ${cursor}` +
        (objectType ? `AND SobjectType = '${objectType.toUpperCase()}'` : '')
      );
    };
    const where = getWhere();
    return `
    SELECT FIELDS(ALL)
    FROM ListView
    ${where}
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
    request(({ cursor, limit }: { cursor?: number; limit: number }) => ({
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
          limit,
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
  listViews: {
    get: request(({ Id }: { Id: number }) => ({
      url: `/sobjects/ListView/${Id}/`,
      method: 'get',
      schema: salesforceListView.passthrough(),
    })),
    list: request(
      ({
        objectType,
        cursor,
        limit,
      }: {
        objectType?: string;
        cursor?: number;
        limit: number;
      }) => ({
        url: `/query`,
        method: 'get',
        schema: z
          .object({
            records: z.array(salesforceListView),
            totalSize: z.number(),
          })
          .passthrough(),
        query: {
          query: queryBuilder.listListView({
            objectType,
            cursor,
            limit,
          }),
        },
      }),
    ),
  },
  listViewResults: {
    get: request(({ Id, objectType }: { Id: number; objectType: string }) => ({
      url: `/sobjects/${objectType}/listviews/${Id}/results`,
      method: 'get',
      schema: salesforceListViewResult.passthrough(),
    })),
  },
  passthrough: request.passthrough(),
};

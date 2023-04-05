import { HttpsUrl } from '@/sdk';
import { makeRequestFactory } from '@/sdk/client';
import { z } from 'zod';
import { salesforceQueryBuilder } from './actions/query-builder';
import { SALESFORCE_API_VERSION } from './constants';
import {
  salesforceContact,
  SalesforceContactCreateInput,
  salesforceContactCreateResponse,
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
      url: `${instanceUrl}/services/data/${SALESFORCE_API_VERSION}${options.url}`,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${await auth.getToken()}`,
      },
    };
  } else {
    throw new Error('Salesforce only supports OAuth2 authentication');
  }
});

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
    request(({ cursor, limit }: { cursor?: string; limit: number }) => ({
      url: `/query/?q=${salesforceQueryBuilder.list({
        objectType,
        cursor,
        relationalSelect,
        limit,
      })}`,
      method: 'GET',
      schema: z
        .object({
          records: z.array(schema),
          totalSize: z.number(),
        })
        .passthrough(),
    })),
};

export const client = {
  users: {
    find: request(({ Id }: { Id: string }) => ({
      url: `/sobjects/User/${Id}/`,
      method: 'GET',
      schema: salesforceUser,
    })),
    list: query.list({
      objectType: 'User',
      schema: salesforceUser,
    }),
  },
  contacts: {
    find: request(({ Id }: { Id: string }) => ({
      url: `/sobjects/Contact/${Id}/`,
      method: 'GET',
      schema: salesforceContact,
    })),
    list: query.list({
      objectType: 'Contact',
      schema: salesforceContact,
    }),
    create: request((contact: SalesforceContactCreateInput) => ({
      url: `/sobjects/Contact`,
      method: 'POST',
      json: contact,
      schema: salesforceContactCreateResponse,
    })),
    update: request(({ Id, Contact }: SalesforceContactUpdate) => ({
      url: `/sobjects/Contact/${Id}/`,
      method: 'PATCH',
      json: Contact,
      schema: salesforceContact,
    })),
  },
  listViews: {
    find: request(({ Id }: { Id: string }) => ({
      url: `/sobjects/ListView/${Id}/`,
      method: 'GET',
      schema: salesforceListView,
    })),
    list: request(
      ({
        objectType,
        cursor,
        limit,
      }: {
        objectType?: string;
        cursor?: string;
        limit: number;
      }) => ({
        url: `/query/?q=${salesforceQueryBuilder.listListView({
          objectType,
          cursor,
          limit,
        })}`,
        method: 'GET',
        schema: z
          .object({
            records: z.array(salesforceListView),
            totalSize: z.number(),
          })
          .passthrough(),
      }),
    ),
  },
  listViewResults: {
    find: request(({ Id, objectType }: { Id: string; objectType: string }) => ({
      url: `/sobjects/${objectType}/listviews/${Id}/results`,
      method: 'GET',
      schema: salesforceListViewResult,
    })),
  },
  passthrough: request.passthrough(),
};

import { HttpsUrl } from '@/sdk';
import { makeRequestFactory } from '@/sdk/client';
import { z } from 'zod';
import { salesforceQueryBuilder } from './actions/query-builder';
import { SALESFORCE_API_VERSION } from './constants';
import {
  salesforceAccount,
  SalesforceAccountCreate,
  salesforceAccountCreateResponse,
  salesforceAccountRelationalSelect,
  SalesforceAccountUpdate,
  salesforceContact,
  SalesforceContactCreate,
  salesforceContactCreateResponse,
  SalesforceContactUpdate,
  salesforceListView,
  salesforceListViewResult,
  salesforceOpportunity,
  SalesforceOpportunityCreate,
  salesforceOpportunityCreateResponse,
  SalesforceOpportunityUpdate,
  salesforceQueryResponse,
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
    relationalSelect?: Partial<Record<SalesforceSupportedObjectType, string>>;
  }) =>
    request(
      ({
        cursor,
        limit,
        associations,
      }: {
        cursor?: string;
        limit: number;
        associations?: SalesforceSupportedObjectType[];
      }) => ({
        url: `/query/?q=${salesforceQueryBuilder.list({
          objectType,
          cursor,
          limit,
          relationalSelect,
          associations,
        })}`,
        method: 'GET',
        schema: z.object({
          records: z.array(schema),
          totalSize: z.number(),
        }),
      }),
    ),
  find: <T extends z.ZodType>({
    schema,
    objectType,
    relationalSelect,
  }: {
    schema: T;
    objectType: SalesforceSupportedObjectType;
    relationalSelect?: Partial<Record<SalesforceSupportedObjectType, string>>;
  }) =>
    request(
      ({
        Id,
        associations,
      }: {
        Id: string;
        associations?: SalesforceSupportedObjectType[];
      }) => ({
        url: `/query/?q=${salesforceQueryBuilder.find({
          id: Id,
          objectType,
          relationalSelect,
          associations,
        })}`,
        method: 'GET',
        schema: z.object({
          records: z.array(schema),
        }),
      }),
    ),
};

export const client = {
  query: request(({ query }: { query: string }) => ({
    url: `/query/`,
    method: 'GET',
    query: { q: query.replace(/ /g, '+') },
    schema: salesforceQueryResponse,
  })),
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
    find: query.find<typeof salesforceContact>({
      objectType: 'Contact',
      schema: salesforceContact,
    }),
    list: query.list<typeof salesforceContact>({
      objectType: 'Contact',
      schema: salesforceContact,
    }),
    create: request(({ Contact }: SalesforceContactCreate) => ({
      url: `/sobjects/Contact`,
      method: 'POST',
      json: Contact,
      schema: salesforceContactCreateResponse,
    })),
    update: request(({ Id, Contact }: SalesforceContactUpdate) => ({
      url: `/sobjects/Contact/${Id}/`,
      method: 'PATCH',
      json: Contact,
      schema: salesforceContact,
    })),
    delete: request(({ Id }: { Id: string }) => ({
      url: `/sobjects/Contact/${Id}/`,
      method: 'DELETE',
      schema: z.undefined(),
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
        schema: z.object({
          records: z.array(salesforceListView),
          totalSize: z.number(),
        }),
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
  accounts: {
    find: query.find<typeof salesforceAccount>({
      objectType: 'Account',
      schema: salesforceAccount,
      relationalSelect: salesforceAccountRelationalSelect,
    }),
    list: query.list<typeof salesforceAccount>({
      objectType: 'Account',
      schema: salesforceAccount,
      relationalSelect: salesforceAccountRelationalSelect,
    }),
    create: request(({ Account }: SalesforceAccountCreate) => ({
      url: `/sobjects/Account`,
      method: 'POST',
      json: Account,
      schema: salesforceAccountCreateResponse,
    })),
    update: request(({ Id, Account }: SalesforceAccountUpdate) => ({
      url: `/sobjects/Account/${Id}/`,
      method: 'PATCH',
      json: Account,
      schema: salesforceAccount,
    })),
    delete: request(({ Id }: { Id: string }) => ({
      url: `/sobjects/Account/${Id}/`,
      method: 'DELETE',
      schema: z.undefined(),
    })),
  },
  opportunities: {
    find: query.find<typeof salesforceOpportunity>({
      objectType: 'Opportunity',
      schema: salesforceOpportunity,
    }),
    list: query.list({
      objectType: 'Opportunity',
      schema: salesforceOpportunity,
    }),
    create: request(({ Opportunity }: SalesforceOpportunityCreate) => ({
      url: `/sobjects/Opportunity`,
      method: 'POST',
      json: Opportunity,
      schema: salesforceOpportunityCreateResponse,
    })),
    update: request(({ Id, Opportunity }: SalesforceOpportunityUpdate) => ({
      url: `/sobjects/Opportunity/${Id}/`,
      method: 'PATCH',
      json: Opportunity,
      schema: salesforceOpportunity,
    })),
    delete: request(({ Id }: { Id: string }) => ({
      url: `/sobjects/Opportunity/${Id}/`,
      method: 'DELETE',
      schema: z.undefined(),
    })),
  },
  passthrough: request.passthrough(),
};

import {
  outreachAccount,
  outreachPaginatedResponse,
  outreachProspect,
  outreachUser,
} from '@/platforms/outreach/schemas';
import { Auth, ClientResult } from '@/sdk';
import { mapKeys } from 'radash';
import { z } from 'zod';

const BASE_URL = 'https://api.outreach.io/api/v2';
const DEFAULT_PAGE_SIZE = 100;

const request =
  <TPath, THeaders, TBody, TQuery, TResponse extends object>({
    url,
    method,
    schema,
    headers,
    json,
    query,
  }: {
    url: (args: TPath) => `${typeof BASE_URL}/${string}`;
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    schema: z.ZodSchema<TResponse>;
    headers?: (args: THeaders) => Record<string, string>;
    json?: (args: TBody) => Record<string, unknown>;
    query?: (args: TQuery) => Record<string, string>;
  }) =>
  async (
    auth: Auth,
    args: TPath & THeaders & TBody & TQuery,
  ): Promise<ClientResult<TResponse>> => {
    const queryString = query
      ? new URLSearchParams(query(args)).toString()
      : '';

    const fullUrl = url(args) + (queryString ? `?${queryString}` : '');

    const response = await auth.retry(
      async () =>
        await fetch(fullUrl, {
          method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await auth.getTokenString()}`,
            ...headers?.(args),
          },
          body: json ? JSON.stringify(json(args)) : undefined,
        }),
    );

    const body = await response.json();

    if (!response.ok) {
      return {
        data: null,
        error: {
          type: 'http',
          body,
          status: response.status,
        },
      };
    }

    const zodResult = await schema.safeParseAsync(body);
    if (!zodResult.success) {
      return {
        data: null,
        error: {
          type: 'zod',
          zodError: zodResult.error,
          original: body,
        },
      };
    }

    await schema.parseAsync(body);
    return {
      error: null,
      data: await schema.parseAsync(body),
    };
  };

export const client = {
  users: {
    get: request({
      url: ({ id }: { id: string }) => `${BASE_URL}/users/${id}`,
      method: 'get',
      schema: z
        .object({
          data: outreachUser,
        })
        .passthrough(),
    }),
    list: request({
      url: () => `${BASE_URL}/users`,
      method: 'get',
      schema: z.intersection(
        z
          .object({
            data: z.array(outreachUser),
          })
          .passthrough(),
        outreachPaginatedResponse,
      ),
    }),
  },
  prospects: {
    get: request({
      url: ({ id }: { id: number }) => `${BASE_URL}/prospects/${id}`,
      method: 'get',
      schema: z
        .object({
          data: outreachProspect,
        })
        .passthrough(),
    }),
    list: request({
      url: ({ cursor }: { cursor?: `${typeof BASE_URL}/${string}` }) =>
        cursor ?? `${BASE_URL}/prospects`,
      query: ({ filters }: { filters?: { email: string } }) => {
        return {
          count: 'false',
          'page[size]': `${DEFAULT_PAGE_SIZE}`,
          ...(filters ? mapKeys(filters, (key) => `filter[${key}]`) : {}),
        };
      },
      method: 'get',
      schema: z.intersection(
        z
          .object({
            data: z.array(outreachUser),
          })
          .passthrough(),
        outreachPaginatedResponse,
      ),
    }),
    create: request({
      url: () => `${BASE_URL}/prospects`,
      json: (prospect: {
        attributes: {
          firstName?: string;
          lastName?: string;
          occupation?: string;
          addressCity?: string;
          addressCountry?: string;
          addressState?: string;
          addressStreet?: string;
          addressStreet2?: string;
          addressZip?: string;
          emails?: string[];
        };
        relationships: {
          owner?: {
            data?: {
              id: number;
              type: 'user';
            };
          };
          account?: {
            data?: {
              id: number;
              type: 'account';
            };
          };
        };
      }) => ({
        data: { type: 'prospect', ...prospect },
      }),
      method: 'post',
      schema: z
        .object({
          data: outreachProspect,
        })
        .passthrough(),
    }),
    update: request({
      url: ({ id }: { id: number }) => `${BASE_URL}/prospects/${id}`,
      json: (prospect: {
        id: number;
        attributes: {
          firstName?: string;
          lastName?: string;
          occupation?: string;
          addressCity?: string;
          addressCountry?: string;
          addressState?: string;
          addressStreet?: string;
          addressStreet2?: string;
          addressZip?: string;
        };
      }) => ({ data: { type: 'prospect', ...prospect } }),
      method: 'patch',
      schema: z
        .object({
          data: outreachProspect,
        })
        .passthrough(),
    }),
  },
  accounts: {
    get: request({
      url: ({ id }: { id: number }) => `${BASE_URL}/accounts/${id}`,
      query: ({ filters }: { filters?: { email: string } }) => {
        return {
          count: 'false',
          'page[size]': `${DEFAULT_PAGE_SIZE}`,
          ...(filters ? mapKeys(filters, (key) => `filter[${key}]`) : {}),
        };
      },
      method: 'get',
      schema: z
        .object({
          data: outreachAccount,
        })
        .passthrough(),
    }),
  },
};

const auth = {} as Auth;

async function foo() {
  const a = await client.users.get(auth, { id: '123' });
  a.data;

  const b = await client.prospects.list(auth, {});
  b.data;
}

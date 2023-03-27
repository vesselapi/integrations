import {
  outreachAccount,
  outreachEmailAddress,
  outreachMailbox,
  outreachMailing,
  outreachPaginatedResponse,
  outreachProspect,
  outreachSequence,
  outreachSequenceState,
  outreachUser,
} from '@/platforms/outreach/schemas';
import { Auth, ClientResult } from '@/sdk';
import { mapKeys, shake } from 'radash';
import { z } from 'zod';

export const BASE_URL = 'https://api.outreach.io/api/v2';
const DEFAULT_PAGE_SIZE = 100;

const request =
  <TPath, THeaders, TBody, TQuery, TMethod, TResponse extends object>({
    url,
    method,
    schema,
    headers,
    json,
    query,
  }: {
    url: (args: TPath) => `${typeof BASE_URL}/${string}`;
    method:
      | 'get'
      | 'post'
      | 'put'
      | 'delete'
      | 'patch'
      | ((args: TMethod) => 'get' | 'post' | 'put' | 'delete' | 'patch');
    schema: z.ZodSchema<TResponse>;
    headers?: (args: THeaders) => Record<string, string>;
    json?: (args: TBody) => Record<string, unknown>;
    query?: (args: TQuery) => Record<string, string>;
  }) =>
  async (
    auth: Auth,
    args: TPath & THeaders & TBody & TQuery & TMethod,
  ): Promise<ClientResult<TResponse>> => {
    const queryString = query
      ? new URLSearchParams(query(args)).toString()
      : '';

    const fullUrl = url(args) + (queryString ? `?${queryString}` : '');

    const response = await auth.retry(
      async () =>
        await fetch(fullUrl, {
          method: typeof method === 'string' ? method : method(args),
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
          type: 'validation',
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
      url: ({ id }: { id: number }) => `${BASE_URL}/users/${id}`,
      method: 'get',
      schema: z
        .object({
          data: outreachUser,
        })
        .passthrough(),
    }),
    list: request({
      url: ({ cursor }: { cursor?: `${typeof BASE_URL}/${string}` }) =>
        cursor ?? `${BASE_URL}/users`,
      method: 'get',
      query: () => ({ count: 'false', 'page[size]': `${DEFAULT_PAGE_SIZE}` }),
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
      query: ({ filters }: { filters?: { emails: string } }) => {
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
      method: 'get',
      schema: z
        .object({
          data: outreachAccount,
        })
        .passthrough(),
    }),
    list: request({
      url: ({ cursor }: { cursor?: `${typeof BASE_URL}/${string}` }) =>
        cursor ?? `${BASE_URL}/accounts`,
      query: ({
        filters,
      }: {
        filters?: { name?: string; domain?: string };
      }) => ({
        count: 'false',
        'page[size]': `${DEFAULT_PAGE_SIZE}`,
        ...(filters ? mapKeys(shake(filters), (key) => `filter[${key}]`) : {}),
      }),
      method: 'get',
      schema: z.intersection(
        z
          .object({
            data: z.array(outreachAccount),
          })
          .passthrough(),
        outreachPaginatedResponse,
      ),
    }),
  },
  mailings: {
    get: request({
      url: ({ id }: { id: number }) => `${BASE_URL}/mailings/${id}`,
      method: 'get',
      schema: z
        .object({
          data: outreachMailing,
        })
        .passthrough(),
    }),
    list: request({
      url: ({ cursor }: { cursor?: `${typeof BASE_URL}/${string}` }) =>
        cursor ?? `${BASE_URL}/mailings`,
      method: 'get',
      query: () => ({ count: 'false', 'page[size]': `${DEFAULT_PAGE_SIZE}` }),
      schema: z.intersection(
        z
          .object({
            data: z.array(outreachMailing),
          })
          .passthrough(),
        outreachPaginatedResponse,
      ),
    }),
  },
  sequences: {
    get: request({
      url: ({ id }: { id: number }) => `${BASE_URL}/sequences/${id}`,
      method: 'get',
      schema: z
        .object({
          data: outreachSequence,
        })
        .passthrough(),
    }),
    list: request({
      url: ({ cursor }: { cursor?: `${typeof BASE_URL}/${string}` }) =>
        cursor ?? `${BASE_URL}/sequences`,
      method: 'get',
      query: () => ({ count: 'false', 'page[size]': `${DEFAULT_PAGE_SIZE}` }),
      schema: z.intersection(
        z
          .object({
            data: z.array(outreachSequence),
          })
          .passthrough(),
        outreachPaginatedResponse,
      ),
    }),
  },
  sequenceStates: {
    create: request({
      url: () => `${BASE_URL}/sequenceStates`,
      json: (sequenceState: {
        relationships: {
          prospect: {
            data: {
              id: number;
              type: 'prospect';
            };
          };
          sequence: {
            data: {
              id: number;
              type: 'sequence';
            };
          };
          mailbox: {
            data: {
              id: number;
              type: 'mailbox';
            };
          };
        };
      }) => ({
        data: {
          type: 'sequenceState',
          ...sequenceState,
        },
      }),
      method: 'post',
      schema: z
        .object({
          data: outreachSequenceState,
        })
        .passthrough(),
    }),
  },
  mailboxes: {
    list: request({
      url: ({ cursor }: { cursor?: `${typeof BASE_URL}/${string}` }) =>
        cursor ?? `${BASE_URL}/mailboxes`,
      method: 'get',
      schema: z.intersection(
        z
          .object({
            data: z.array(outreachMailbox),
          })
          .passthrough(),
        outreachPaginatedResponse,
      ),
    }),
  },
  emailAddresses: {
    create: request({
      url: () => `${BASE_URL}/emailAddresses`,
      json: (emailAddress: {
        attributes: {
          email: string;
          emailType?: 'work' | 'personal';
          order?: number;
        };
        relationships: {
          prospect: {
            data: {
              type: 'prospect';
              id: number;
            };
          };
        };
      }) => ({ data: { type: 'emailAddress', ...emailAddress } }),
      method: 'post',
      schema: z
        .object({
          data: outreachEmailAddress,
        })
        .passthrough(),
    }),
  },
  passthrough: request({
    url: ({ url }: { url: `${typeof BASE_URL}/${string}` }) => url,
    method: ({
      method,
    }: {
      method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    }) => method,
    query: ({ query }: { query: Record<string, string> }) => query,
    json: ({ body }: { body: Record<string, unknown> }) => body,
    schema: z.any(),
  }),
};

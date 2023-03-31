import {
  outreachAccount,
  outreachEmailAddress,
  outreachMailbox,
  outreachMailing,
  outreachPaginatedResponse,
  outreachProspect,
  outreachSequence,
  outreachSequenceState,
  outreachSequenceStep,
  outreachUser,
} from '@/platforms/outreach/schemas';
import { makeRequestFactory } from '@/sdk/client';
import * as custom from '@/sdk/validators';
import { mapKeys, shake } from 'radash';
import { z } from 'zod';
import { BASE_URL, DEFAULT_PAGE_SIZE } from './constants';

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

export const client = {
  users: {
    get: request({
      url: ({ id }: { id: number }) => `/users/${id}`,
      method: 'get',
      schema: z
        .object({
          data: outreachUser,
        })
        .passthrough(),
    }),
    list: request({
      url: ({ cursor }: { cursor?: `${typeof BASE_URL}/${string}` }) =>
        cursor ?? `/users`,
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
      url: ({ id }: { id: number }) => `/prospects/${id}`,
      method: 'get',
      schema: z
        .object({
          data: outreachProspect,
        })
        .passthrough(),
    }),
    list: request({
      url: ({ cursor }: { cursor?: `${typeof BASE_URL}/${string}` }) =>
        cursor ?? `/prospects`,
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
            data: z.array(outreachProspect),
          })
          .passthrough(),
        outreachPaginatedResponse,
      ),
    }),
    create: request({
      url: () => `/prospects`,
      json: (prospect: {
        attributes: {
          firstName?: string | null;
          lastName?: string | null;
          occupation?: string | null;
          addressCity?: string | null;
          addressCountry?: string | null;
          addressState?: string | null;
          addressStreet?: string | null;
          addressStreet2?: string | null;
          addressZip?: string | null;
          emails?: string[];
          [key: `custom${number}`]: string | null;
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
      url: ({ id }: { id: number }) => `/prospects/${id}`,
      json: (prospect: {
        id: number;
        attributes: {
          firstName?: string | null;
          lastName?: string | null;
          occupation?: string | null;
          addressCity?: string | null;
          addressCountry?: string | null;
          addressState?: string | null;
          addressStreet?: string | null;
          addressStreet2?: string | null;
          addressZip?: string | null;
          [key: `custom${number}`]: string | null;
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
      url: ({ id }: { id: number }) => `/accounts/${id}`,
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
      url: ({ id }: { id: number }) => `/mailings/${id}`,
      method: 'get',
      schema: z
        .object({
          data: outreachMailing,
        })
        .passthrough(),
    }),
    list: request({
      url: ({ cursor }: { cursor?: `${typeof BASE_URL}/${string}` }) =>
        cursor ?? `/mailings`,
      method: 'get',
      query: ({
        filters,
      }: {
        filters?: {
          prospectId?: number;
          sequenceId?: number;
        };
      }) => ({
        count: 'false',
        'page[size]': `${DEFAULT_PAGE_SIZE}`,
        ...(filters ? mapKeys(shake(filters), (key) => `filter[${key}]`) : {}),
      }),
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
      url: ({ id }: { id: number }) => `/sequences/${id}`,
      method: 'get',
      schema: z
        .object({
          data: outreachSequence,
        })
        .passthrough(),
    }),
    list: request({
      url: ({ cursor }: { cursor?: `${typeof BASE_URL}/${string}` }) =>
        cursor ?? `/sequences`,
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
    create: request({
      url: () => `/sequences`,
      method: 'post',
      json: (sequence: {
        attributes: {
          name: string;
          sequenceType: 'date' | 'interval';
          shareType: 'private' | 'read_only' | 'shared';
        };
      }) => ({
        data: { type: 'sequence', ...sequence },
      }),
      schema: z
        .object({
          data: outreachSequence,
        })
        .passthrough(),
    }),
  },
  sequenceStates: {
    create: request({
      url: () => `/sequenceStates`,
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
  sequenceSteps: {
    create: request({
      url: () => `/sequenceSteps`,
      method: 'post',
      json: (sequenceStep: {
        attributes: {
          order?: number;
          stepType: 'auto_email' | 'manual_email' | 'call' | 'task';
          interval?: number;
        };
        relationships: {
          sequence: {
            data: {
              type: 'sequence';
              id: number;
            };
          };
        };
      }) => ({
        data: {
          type: 'sequenceStep',
          ...sequenceStep,
        },
      }),
      schema: custom.object({
        data: outreachSequenceStep,
      }),
    }),
  },
  mailboxes: {
    list: request({
      url: ({ cursor }: { cursor?: `${typeof BASE_URL}/${string}` }) =>
        cursor ?? `/mailboxes`,
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
      url: () => `/emailAddresses`,
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
export { BASE_URL };

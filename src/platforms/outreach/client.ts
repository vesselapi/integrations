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
  outreachSequenceTemplate,
  outreachTemplate,
  outreachUser,
} from '@/platforms/outreach/schemas';
import { makeRequestFactory } from '@/sdk/client';
import * as custom from '@/sdk/validators';
import { mapKeys, shake } from 'radash';
import { z } from 'zod';
import { BASE_URL, DEFAULT_PAGE_SIZE } from './constants';

const request = makeRequestFactory(async (auth, options) => ({
  ...options,
  url: !options.url.startsWith(BASE_URL)
    ? `${BASE_URL}${options.url}`
    : options.url,
  headers: {
    ...options.headers,
    Authorization: `Bearer ${await auth.getToken()}`,
  },
}));

export const client = {
  users: {
    find: request(({ id }: { id: number }) => ({
      url: `/users/${id}`,
      method: 'get',
      schema: z
        .object({
          data: outreachUser,
        })
        .passthrough(),
    })),
    list: request(
      ({ cursor }: { cursor?: `${typeof BASE_URL}/${string}` }) => ({
        url: cursor ?? `/users`,
        method: 'get',
        query: { count: 'false', 'page[size]': `${DEFAULT_PAGE_SIZE}` },
        schema: z.intersection(
          z
            .object({
              data: z.array(outreachUser),
            })
            .passthrough(),
          outreachPaginatedResponse,
        ),
      }),
    ),
  },
  prospects: {
    find: request(({ id }: { id: number }) => ({
      url: `/prospects/${id}`,
      method: 'get',
      schema: z
        .object({
          data: outreachProspect,
        })
        .passthrough(),
    })),
    list: request(
      ({
        cursor,
        filters,
      }: {
        cursor?: `${typeof BASE_URL}/${string}`;
        filters?: { emails: string };
      }) => ({
        url: cursor ?? `/prospects`,
        query: {
          count: 'false',
          'page[size]': `${DEFAULT_PAGE_SIZE}`,
          ...(filters ? mapKeys(filters, (key) => `filter[${key}]`) : {}),
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
    ),
    create: request(
      (prospect: {
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
        url: `/prospects`,
        json: {
          data: { type: 'prospect', ...prospect },
        },
        method: 'post',
        schema: z
          .object({
            data: outreachProspect,
          })
          .passthrough(),
      }),
    ),
    update: request(
      (prospect: {
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
      }) => ({
        url: `/prospects/${prospect.id}`,
        json: { data: { type: 'prospect', ...prospect } },
        method: 'patch',
        schema: z
          .object({
            data: outreachProspect,
          })
          .passthrough(),
      }),
    ),
  },
  accounts: {
    find: request(({ id }: { id: number }) => ({
      url: `/accounts/${id}`,
      method: 'get',
      schema: z
        .object({
          data: outreachAccount,
        })
        .passthrough(),
    })),
    list: request(
      ({
        cursor,
        filters,
      }: {
        cursor?: `${typeof BASE_URL}/${string}`;
        filters?: { name?: string; domain?: string };
      }) => ({
        url: cursor ?? `${BASE_URL}/accounts`,
        query: {
          count: 'false',
          'page[size]': `${DEFAULT_PAGE_SIZE}`,
          ...(filters
            ? mapKeys(shake(filters), (key) => `filter[${key}]`)
            : {}),
        },
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
    ),
  },
  mailings: {
    find: request(({ id }: { id: number }) => ({
      url: `/mailings/${id}`,
      method: 'get',
      schema: z
        .object({
          data: outreachMailing,
        })
        .passthrough(),
    })),
    list: request(
      ({
        cursor,
        filters,
      }: {
        cursor?: `${typeof BASE_URL}/${string}`;
        filters?: {
          prospectId?: number;
          sequenceId?: number;
        };
      }) => ({
        url: cursor ?? `/mailings`,
        method: 'get',
        query: {
          count: 'false',
          'page[size]': `${DEFAULT_PAGE_SIZE}`,
          ...(filters
            ? mapKeys(shake(filters), (key) => `filter[${key}]`)
            : {}),
        },
        schema: z.intersection(
          z
            .object({
              data: z.array(outreachMailing),
            })
            .passthrough(),
          outreachPaginatedResponse,
        ),
      }),
    ),
  },
  sequences: {
    find: request(({ id }: { id: number }) => ({
      url: `/sequences/${id}`,
      method: 'get',
      schema: z
        .object({
          data: outreachSequence,
        })
        .passthrough(),
    })),
    list: request(
      ({ cursor }: { cursor?: `${typeof BASE_URL}/${string}` }) => ({
        url: cursor ?? `/sequences`,
        method: 'get',
        query: { count: 'false', 'page[size]': `${DEFAULT_PAGE_SIZE}` },
        schema: z.intersection(
          z
            .object({
              data: z.array(outreachSequence),
            })
            .passthrough(),
          outreachPaginatedResponse,
        ),
      }),
    ),
    create: request(
      (sequence: {
        attributes: {
          name: string;
          sequenceType: 'date' | 'interval';
          shareType: 'private' | 'read_only' | 'shared';
        };
      }) => ({
        url: `/sequences`,
        method: 'post',
        json: {
          data: { type: 'sequence', ...sequence },
        },
        schema: z
          .object({
            data: outreachSequence,
          })
          .passthrough(),
      }),
    ),
  },
  sequenceStates: {
    create: request(
      (sequenceState: {
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
        url: `/sequenceStates`,
        json: {
          data: {
            type: 'sequenceState',
            ...sequenceState,
          },
        },
        method: 'post',
        schema: z
          .object({
            data: outreachSequenceState,
          })
          .passthrough(),
      }),
    ),
  },
  sequenceSteps: {
    create: request(
      (sequenceStep: {
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
        url: `/sequenceSteps`,
        method: 'post',
        json: {
          data: {
            type: 'sequenceStep',
            ...sequenceStep,
          },
        },
        schema: custom.object({
          data: outreachSequenceStep,
        }),
      }),
    ),
  },
  mailboxes: {
    list: request(
      ({ cursor }: { cursor?: `${typeof BASE_URL}/${string}` }) => ({
        url: cursor ?? `/mailboxes`,
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
    ),
  },
  templates: {
    create: request(
      (template: {
        attributes: {
          bodyHtml: string;
          name: string;
          subject?: string | null;
          trackOpens?: boolean;
        };
      }) => ({
        url: `/templates`,
        method: 'post',
        json: {
          data: {
            type: 'template',
            ...template,
          },
        },
        schema: custom.object({
          data: outreachTemplate,
        }),
      }),
    ),
  },
  sequenceTemplates: {
    create: request(
      (sequenceTemplate: {
        attributes: {
          isReply: boolean;
        };
        relationships: {
          sequenceStep: {
            data: {
              type: 'sequenceStep';
              id: number;
            };
          };
          template: {
            data: {
              type: 'template';
              id: number;
            };
          };
        };
      }) => ({
        url: `/sequenceTemplates`,
        method: 'post',
        json: {
          data: {
            type: 'sequenceTemplate',
            ...sequenceTemplate,
          },
        },
        schema: custom.object({
          data: outreachSequenceTemplate,
        }),
      }),
    ),
  },
  emailAddresses: {
    create: request(
      (emailAddress: {
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
      }) => ({
        url: `/emailAddresses`,
        json: { data: { type: 'emailAddress', ...emailAddress } },
        method: 'post',
        schema: z
          .object({
            data: outreachEmailAddress,
          })
          .passthrough(),
      }),
    ),
  },
  passthrough: request.passthrough(),
};
export { BASE_URL };

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
import { HttpsUrl } from '@/sdk';
import {
  formatUpsertInputWithNative,
  formatUrl,
  makeRequestFactory,
} from '@/sdk/client';
import * as custom from '@/sdk/validators';
import { mapKeys, omit, shake } from 'radash';
import { z } from 'zod';
import { BASE_URL, DEFAULT_PAGE_SIZE } from './constants';

const request = makeRequestFactory(async (auth, options) => ({
  ...options,
  url: formatUrl(BASE_URL, options.url),
  headers: {
    ...options.headers,
    Authorization: `Bearer ${await auth.getToken()}`,
  },
}));

// Used exclusively for GraphQL requests.
const _graphQl = makeRequestFactory(async (auth, options) => {
  console.log(options);

  return {
    ...options,
    url: options.url as `https://${HttpsUrl}/graphql/${string}`,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${await auth.getToken()}`,
    },
  };
});

export const client = {
  users: {
    find: request(({ id }: { id: number }) => ({
      url: `/users/${id}`,
      method: 'GET',
      schema: z.object({
        data: outreachUser,
      }),
    })),
    list: request(
      ({ cursor }: { cursor?: `${typeof BASE_URL}/${string}` }) => ({
        url: cursor ?? `/users`,
        method: 'GET',
        query: { count: 'false', 'page[size]': `${DEFAULT_PAGE_SIZE}` },
        schema: z.intersection(
          z.object({
            data: z.array(outreachUser),
          }),
          outreachPaginatedResponse,
        ),
      }),
    ),
  },
  prospects: {
    find: request(({ id }: { id: number }) => ({
      url: `/prospects/${id}`,
      method: 'GET',
      schema: z.object({
        data: outreachProspect,
      }),
    })),
    list: request(
      ({
        cursor,
        filters,
      }: {
        cursor?: `${typeof BASE_URL}/${string}`;
        filters?: { emails?: string; tags?: string; sequenceIds?: string };
      }) => ({
        url: cursor ?? `/prospects`,
        query: shake({
          count: 'false',
          'page[size]': `${DEFAULT_PAGE_SIZE}`,
          'filter[sequenceStates][sequence][id]': filters?.sequenceIds,
          ...(filters
            ? mapKeys<any, any, any>(
                omit(filters, ['sequenceIds']),
                (key) => `filter[${key}]`,
              )
            : {}),
        }),
        method: 'GET',
        schema: z.intersection(
          z.object({
            data: z.array(outreachProspect),
          }),
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
          $native?: Record<string, unknown>;
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
          data: {
            type: 'prospect',
            ...prospect,
            attributes: formatUpsertInputWithNative(prospect.attributes),
          },
        },
        method: 'POST',
        schema: z.object({
          data: outreachProspect,
        }),
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
          $native?: Record<string, unknown>;
        };
      }) => ({
        url: `/prospects/${prospect.id}`,
        json: {
          data: {
            type: 'prospect',
            ...prospect,
            attributes: formatUpsertInputWithNative(prospect.attributes),
          },
        },
        method: 'PATCH',
        schema: z.object({
          data: outreachProspect,
        }),
      }),
    ),
  },
  accounts: {
    find: request(({ id }: { id: number }) => ({
      url: `/accounts/${id}`,
      method: 'GET',
      schema: z.object({
        data: outreachAccount,
      }),
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
        method: 'GET',
        schema: z.intersection(
          z.object({
            data: z.array(outreachAccount),
          }),
          outreachPaginatedResponse,
        ),
      }),
    ),
  },
  mailings: {
    find: request(({ id }: { id: number }) => ({
      url: `/mailings/${id}`,
      method: 'GET',
      schema: z.object({
        data: outreachMailing,
      }),
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
        method: 'GET',
        query: {
          count: 'false',
          'page[size]': `${DEFAULT_PAGE_SIZE}`,
          ...(filters
            ? mapKeys(shake(filters), (key) => `filter[${key}]`)
            : {}),
        },
        schema: z.intersection(
          z.object({
            data: z.array(outreachMailing),
          }),
          outreachPaginatedResponse,
        ),
      }),
    ),
  },
  sequences: {
    find: request(({ id }: { id: number }) => ({
      url: `/sequences/${id}`,
      method: 'GET',
      schema: z.object({
        data: outreachSequence,
      }),
    })),
    list: request(
      ({ cursor }: { cursor?: `${typeof BASE_URL}/${string}` }) => ({
        url: cursor ?? `/sequences`,
        method: 'GET',
        query: { count: 'false', 'page[size]': `${DEFAULT_PAGE_SIZE}` },
        schema: z.intersection(
          z.object({
            data: z.array(outreachSequence),
          }),
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
          $native?: Record<string, unknown>;
        };
      }) => ({
        url: `/sequences`,
        method: 'POST',
        json: {
          data: {
            type: 'sequence',
            attributes: formatUpsertInputWithNative(sequence.attributes),
          },
        },
        schema: z.object({
          data: outreachSequence,
        }),
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
          $native?: Record<string, unknown>;
        };
      }) => ({
        url: `/sequenceStates`,
        json: {
          data: {
            type: 'sequenceState',
            relationships: formatUpsertInputWithNative(
              sequenceState.relationships,
            ),
          },
        },
        method: 'POST',
        schema: z.object({
          data: outreachSequenceState,
        }),
      }),
    ),
  },
  sequenceSteps: {
    list: request(
      ({
        cursor,
        filters,
        include,
      }: {
        cursor?: `${typeof BASE_URL}/${string}`;
        filters?: { sequenceIds?: string };
        include?: string;
      }) => ({
        url: cursor ?? `/sequenceSteps`,
        query: shake({
          'page[size]': `${DEFAULT_PAGE_SIZE}`,
          'filter[sequence][id]': filters?.sequenceIds,
          include,
        }),
        method: 'GET',
        schema: z.intersection(
          z.object({
            data: z.array(outreachSequenceStep),
          }),
          outreachPaginatedResponse,
        ),
      }),
    ),
    create: request(
      (sequenceStep: {
        attributes: {
          order?: number;
          stepType: 'auto_email' | 'manual_email' | 'call' | 'task';
          interval?: number;
          $native?: Record<string, unknown>;
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
        method: 'POST',
        json: {
          data: {
            type: 'sequenceStep',
            ...sequenceStep,
            attributes: formatUpsertInputWithNative(sequenceStep.attributes),
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
        method: 'GET',
        schema: z.intersection(
          z.object({
            data: z.array(outreachMailbox),
          }),
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
          $native?: Record<string, unknown>;
        };
      }) => ({
        url: `/templates`,
        method: 'POST',
        json: {
          data: {
            type: 'template',
            attributes: formatUpsertInputWithNative(template.attributes),
          },
        },
        schema: custom.object({
          data: outreachTemplate,
        }),
      }),
    ),
  },
  sequenceTemplates: {
    list: request(
      ({
        cursor,
        filters,
        include,
      }: {
        cursor?: `${typeof BASE_URL}/${string}`;
        filters?: { ids?: string };
        include?: string;
      }) => ({
        url: cursor ?? `/sequenceTemplates`,
        query: shake({
          'page[size]': `${DEFAULT_PAGE_SIZE}`,
          'filter[id]': filters?.ids,
          include,
        }),
        method: 'GET',
        schema: z.intersection(
          z.object({
            data: z.array(outreachSequenceTemplate),
            included: z.array(outreachTemplate).optional(),
          }),
          outreachPaginatedResponse,
        ),
      }),
    ),
    create: request(
      (sequenceTemplate: {
        attributes: {
          isReply: boolean;
          $native?: Record<string, unknown>;
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
        method: 'POST',
        json: {
          data: {
            type: 'sequenceTemplate',
            ...sequenceTemplate,
            attributes: formatUpsertInputWithNative(
              sequenceTemplate.attributes,
            ),
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
          $native?: Record<string, unknown>;
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
        json: {
          data: {
            type: 'emailAddress',
            ...emailAddress,
            attributes: formatUpsertInputWithNative(emailAddress.attributes),
          },
        },
        method: 'POST',
        schema: z.object({
          data: outreachEmailAddress,
        }),
      }),
    ),
  },
  passthrough: request.passthrough(),
  // @deprecated
  graphQl: _graphQl(
    ({
      prefix,
      resource,
      query,
      variables,
    }: {
      prefix?: string;
      resource: string;
      query: string;
      variables: Record<string, any>;
    }) => ({
      url: `https://${prefix ?? 'app2c'}.outreach.io/graphql/${resource}`,
      method: 'POST',
      json: {
        query,
        variables,
      },
      schema: z.object({
        data: z.any(),
      }),
    }),
  ),
};
export { BASE_URL };

import { DEFAULT_PAGE_SIZE } from '@/platforms/active-campaign/constants';
import { BASE_URL } from '@/platforms/microsoft/constants';
import {
  microsoftChannel,
  microsoftConversationMember,
  microsoftGroup,
  microsoftMessage,
  microsoftPaginated,
} from '@/platforms/microsoft/schemas';
import { formatUrl, makeRequestFactory } from '@/sdk/client';
import * as custom from '@/sdk/validators';
import { z } from 'zod';

const request = makeRequestFactory(async (auth, options) => {
  return {
    ...options,
    url: formatUrl(BASE_URL, options.url),
    headers: {
      ...options.headers,
      Authorization: `Bearer ${await auth.getToken()}`,
    },
  };
});

// The graph api supports an entire query language. Right now most queries
// are just hardcoded.
export const client = {
  groups: {
    list: request(
      ({
        filter,
        cursor,
      }: {
        filter?: "resourceProvisioningOptions/Any(x:x eq 'Team')";
        cursor?: `${typeof BASE_URL}/${string}`;
      }) => ({
        url: cursor ?? '/groups',
        method: 'GET',
        query: {
          ...(filter ? { $filter: filter } : {}),
          $top: `${DEFAULT_PAGE_SIZE}`,
        },
        schema: custom
          .object({
            value: z.array(microsoftGroup),
          })
          .extend(microsoftPaginated.shape),
      }),
    ),
  },
  teams: {
    members: {
      list: request(
        ({
          teamId,
          cursor,
        }: {
          teamId: string;
          cursor?: `${typeof BASE_URL}/${string}`;
        }) => ({
          url: cursor ?? `/teams/${teamId}/members`,
          method: 'GET',
          query: {
            $top: `${DEFAULT_PAGE_SIZE}`,
          },
          schema: custom
            .object({
              value: z.array(microsoftConversationMember),
            })
            .extend(microsoftPaginated.shape),
        }),
      ),
    },
    channels: {
      list: request(
        ({
          teamId,
          cursor,
        }: {
          teamId: string;
          cursor?: `${typeof BASE_URL}/${string}`;
        }) => ({
          url: cursor ?? `/teams/${teamId}/channels`,
          method: 'GET',
          query: {
            $top: `${DEFAULT_PAGE_SIZE}`,
          },
          schema: custom
            .object({
              value: z.array(microsoftChannel),
            })
            .extend(microsoftPaginated.shape),
        }),
      ),
    },
    messages: {
      create: request(
        ({
          teamId,
          channelId,
          text,
        }: {
          teamId: string;
          channelId: string;
          text: string;
        }) => ({
          url: `/teams/${teamId}/channels/${channelId}/messages`,
          method: 'POST',
          json: {
            body: {
              content: text,
            },
          },
          schema: microsoftMessage,
        }),
      ),
    },
  },
  passthrough: request.passthrough(),
};

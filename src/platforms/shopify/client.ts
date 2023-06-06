import { formatUrl, makeRequestFactory } from '@/sdk/client';
import * as custom from '@/sdk/validators';
import { z } from 'zod';

const request = makeRequestFactory(async (auth, options) => {
  const { answers } = await auth.getMetadata();
  return {
    ...options,
    url: formatUrl(
      `https://${answers.shop}.myshopify.com/admin/api/${constants.API_VERSION}`,
      options.url,
    ),
    headers: {
      ...options.headers,
      Authorization: `Bearer ${await auth.getToken()}`,
    },
  };
});

export const client = {
  users: {
    list: request(({ cursor }: { cursor?: string }) => ({
      url: '/users.list',
      method: 'GET',
      query: {
        ...(cursor ? { cursor } : {}),
        limit: `${DEFAULT_PAGE_SIZE}`,
      },
      schema: custom
        .object({
          members: z.array(slackUser),
        })
        .extend(slackPaginated.shape),
    })),
  },
  conversations: {
    list: request(({ cursor }: { cursor?: string }) => ({
      url: '/conversations.list',
      method: 'GET',
      query: {
        ...(cursor ? { cursor } : {}),
        limit: `${DEFAULT_PAGE_SIZE}`,
      },
      schema: custom
        .object({
          channels: z.array(slackConversation),
        })
        .extend(slackPaginated.shape),
    })),
  },
  messages: {
    create: request(
      ({
        channel,
        text,
        $native,
      }: {
        channel: string;
        text: string;
        $native?: Record<string, unknown>;
      }) => ({
        url: '/chat.postMessage',
        method: 'POST',
        json: {
          channel,
          text,
          ...($native ?? {}),
        },
        schema: custom.object({
          ts: z.string(),
        }),
      }),
    ),
    update: request(
      ({
        channel,
        ts,
        text,
        $native,
      }: {
        channel: string;
        ts: string;
        text: string;
        $native?: Record<string, unknown>;
      }) => ({
        url: '/chat.update',
        method: 'POST',
        json: {
          channel,
          ts,
          text,
          ...($native ?? {}),
        },
        schema: custom.object({
          ts: z.string(),
        }),
      }),
    ),
  },
  passthrough: request.passthrough(),
};

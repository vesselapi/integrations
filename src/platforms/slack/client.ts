import { BASE_URL, DEFAULT_PAGE_SIZE } from '@/platforms/slack/constants';
import {
  slackConversation,
  slackPaginated,
  slackUser,
} from '@/platforms/slack/schemas';
import { makeRequestFactory } from '@/sdk/client';
import * as custom from '@/sdk/validators';
import { z } from 'zod';

const request = makeRequestFactory(async (auth, options) => {
  return {
    ...options,
    url: !options.url.startsWith(BASE_URL)
      ? `${BASE_URL}${options.url}`
      : options.url,
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
      method: 'get',
      query: {
        ...(cursor ? { cursor } : {}),
        limit: `${DEFAULT_PAGE_SIZE}`,
      },
      schema: z.intersection(
        custom.object({
          members: z.array(slackUser),
        }),
        slackPaginated,
      ),
    })),
  },
  conversations: {
    list: request(({ cursor }: { cursor?: string }) => ({
      url: '/conversations.list',
      method: 'get',
      query: {
        ...(cursor ? { cursor } : {}),
        limit: `${DEFAULT_PAGE_SIZE}`,
      },
      schema: z.intersection(
        custom.object({
          channels: z.array(slackConversation),
        }),
        slackPaginated,
      ),
    })),
  },
  chat: {
    postMessage: request(
      ({ channel, text }: { channel: string; text: string }) => ({
        url: '/chat.postMessage',
        method: 'post',
        json: {
          channel,
          text,
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
      }: {
        channel: string;
        ts: string;
        text: string;
      }) => ({
        url: '/chat.update',
        method: 'post',
        json: {
          channel,
          ts,
          text,
        },
        schema: custom.object({
          ts: z.string(),
        }),
      }),
    ),
  },
  passthrough: request.passthrough(),
};

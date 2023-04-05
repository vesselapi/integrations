import { HttpsUrl } from '@/sdk';
import { makeRequestFactory } from '@/sdk/client';
import * as custom from '@/sdk/validators';
import { shake } from 'radash';
import * as z from 'zod';
import { API_DOMAIN, API_VERSION } from './constants';
import { mailchimpList, mailchimpMember, MailchimpMember } from './schemas';

const BASE_URL = `${API_DOMAIN}/${API_VERSION}` as HttpsUrl;

const metaRequest = makeRequestFactory(async (auth, options) => ({
  ...options,
  headers: {
    Authorization: `OAuth ${await auth.getToken()}`,
  },
}));

const request = makeRequestFactory(async (auth, options) => {
  const { dc } = await metaRequest(({}) => ({
    url: 'https://login.mailchimp.com/oauth2/metadata',
    method: 'GET',
    schema: custom.object({ dc: z.string() }),
  }))(auth, {});
  return {
    ...options,
    url: `https://${dc}.${BASE_URL}${options.url}`,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await auth.getToken()}`,
    },
  };
});

export const client = {
  lists: {
    find: request(({ id }: { id: string }) => ({
      url: `/lists/${id}`,
      method: 'GET',
      schema: z.any(),
    })),
    list: request(({ count, offset }: { count?: number; offset?: number }) => ({
      url: `/lists`,
      method: 'GET',
      schema: custom.object({
        lists: z.array(mailchimpList),
      }),
      query: shake({
        count: count ? `${count}` : undefined,
        offset: offset ? `${offset}` : undefined,
      }),
    })),
  },
  members: {
    search: request(
      ({
        list_id,
        fields,
        exclude_fields,
        query,
      }: {
        list_id?: string;
        fields?: string[];
        exclude_fields?: string[];
        query: string;
      }) => ({
        url: `/search-members`,
        method: 'GET',
        schema: custom.object({
          exact_matches: custom.object({
            members: z.array(mailchimpMember),
          }),
          full_search: custom.object({
            members: z.array(mailchimpMember),
          }),
        }),
        query: shake({
          list_id,
          fields: fields && fields.length > 0 ? fields.join(',') : undefined,
          exclude_fields:
            exclude_fields && exclude_fields.length > 0
              ? exclude_fields.join(',')
              : undefined,
          query,
        }),
      }),
    ),
    create: request(
      ({
        list_id,
        member,
      }: {
        list_id: string;
        member: Partial<MailchimpMember>;
      }) => ({
        url: `/lists/${list_id}/members`,
        method: 'POST',
        schema: custom.object({
          id: z.string(),
        }),
        json: member,
      }),
    ),
    update: request(
      ({
        list_id,
        subscriber_hash,
        member,
      }: {
        list_id: string;
        subscriber_hash: string;
        member: Partial<MailchimpMember>;
      }) => ({
        url: `/lists/${list_id}/members/${subscriber_hash}`,
        method: 'PATCH',
        schema: custom.object({
          id: z.string(),
        }),
        json: member,
      }),
    ),
  },
  passthrough: request.passthrough(),
};

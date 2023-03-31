import { makeRequestFactory } from '@/sdk/client';
import { objectify, shake } from 'radash';
import { z } from 'zod';
import { BASE_URL } from './constants';
import {
  apolloAccount,
  ApolloAccountCreate,
  ApolloAccountUpdate,
  apolloContact,
  ApolloContactCreate,
  ApolloContactUpdate,
  ApolloCreateCustomField,
  ApolloCreateSequence,
  ApolloCreateSequenceStep,
  apolloCustomField,
  apolloEmailAccount,
  apolloEmailActivity,
  apolloEmailMessage,
  apolloPaginatedResponse,
  apolloSequence,
  apolloSequenceStep,
  ApolloUpdateSequenceTemplate,
  apolloUser,
} from './schemas';

const request = makeRequestFactory(
  BASE_URL,
  ({ auth, fullUrl, method, json }) =>
    async () => {
      if (method === 'get') {
        const wKey = new URL(fullUrl);
        wKey.searchParams.append('api_key', await auth.getToken());
        fullUrl = wKey.toString() as `${typeof BASE_URL}/${string}`;
      }
      return await fetch(fullUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: json
          ? JSON.stringify({ ...json, api_key: await auth.getToken() })
          : undefined,
      });
    },
);

export const client = {
  users: {
    search: request({
      url: () => `/users/search`,
      method: 'get',
      query: ({ page }: { page?: number }) => shake({ page }),
      schema: z
        .object({
          users: z.array(apolloUser),
          pagination: apolloPaginatedResponse,
        })
        .passthrough(),
    }),
  },
  accounts: {
    search: request({
      url: () => `/accounts/search`,
      method: 'post',
      query: ({
        q_organization_name,
        page,
      }: {
        q_organization_name?: string;
        page?: number;
      }) => shake({ page, q_organization_name }),
      schema: z
        .object({
          accounts: z.array(apolloAccount),
          pagination: apolloPaginatedResponse,
        })
        .passthrough(),
    }),
    create: request({
      url: () => `/accounts`,
      method: 'post',
      json: (account: ApolloAccountCreate) => shake(account),
      schema: z
        .object({
          account: apolloAccount,
        })
        .passthrough(),
    }),
    update: request({
      url: ({ id }: { id: string }) => `/accounts/${id}`,
      method: 'put',
      json: (account: ApolloAccountUpdate) => shake(account),
      schema: z
        .object({
          account: apolloAccount,
        })
        .passthrough(),
    }),
  },
  contacts: {
    search: request({
      url: () => `/contacts/search`,
      method: 'post',
      query: ({ q_keywords, page }: { q_keywords?: string; page?: number }) =>
        shake({ page, q_keywords }),
      schema: z
        .object({
          contacts: z.array(apolloContact),
          pagination: apolloPaginatedResponse,
        })
        .passthrough(),
    }),
    create: request({
      url: () => `/contacts`,
      method: 'post',
      json: (contact: ApolloContactCreate) => shake(contact),
      schema: z
        .object({
          contact: apolloContact,
        })
        .passthrough(),
    }),
    update: request({
      url: ({ id }: { id: string }) => `/contacts/${id}`,
      method: 'put',
      json: (contact: ApolloContactUpdate) => shake(contact),
      schema: z
        .object({
          contact: apolloContact,
        })
        .passthrough(),
    }),
  },
  emails: {
    search: request({
      url: () => `/emailer_messages/search`,
      method: 'post',
      query: ({
        emailer_campaign_id,
        page,
      }: {
        emailer_campaign_id?: string;
        page?: number;
      }) => shake({ page, emailer_campaign_id }),
      schema: z
        .object({
          emailer_messages: z.array(apolloEmailMessage),
        })
        .passthrough(),
    }),
  },
  activities: {
    list: request({
      url: () => `/activities`,
      method: 'get',
      query: ({
        contact_id,
        types,
      }: {
        contact_id?: string;
        types?: string[];
      }) =>
        shake({
          contact_id,
          ...(types
            ? objectify(
                types,
                () => 'type[]',
                (value: string) => value,
              )
            : {}),
        }),
      schema: z
        .object({
          activities: z.array(apolloEmailActivity),
        })
        .passthrough(),
    }),
  },
  sequences: {
    search: request({
      url: () => `/emailer_campaigns/search`,
      method: 'post',
      query: ({ q_keywords, page }: { q_keywords?: string; page?: number }) =>
        shake({ page, q_keywords }),
      schema: z
        .object({
          emailer_campaigns: z.array(apolloSequence),
          pagination: apolloPaginatedResponse,
        })
        .passthrough(),
    }),
    create: request({
      url: () => `/emailer_campaigns`,
      method: 'post',
      json: (sequence: ApolloCreateSequence) => shake(sequence),
      schema: z
        .object({
          emailer_campaign: apolloSequence,
        })
        .passthrough(),
    }),
    addContacts: request({
      url: ({ emailer_campaign_id }: { emailer_campaign_id: string }) =>
        `/emailer_campaigns/${emailer_campaign_id}/add_contact_ids`,
      method: 'post',
      json: ({
        emailer_campaign_id,
        contact_ids,
        send_email_from_email_account_id,
      }: {
        emailer_campaign_id: string;
        contact_ids: string[];
        send_email_from_email_account_id?: string;
      }) =>
        shake({
          contact_ids,
          emailer_campaign_id,
          send_email_from_email_account_id,
        }),
      schema: z
        .object({
          contacts: z.array(apolloContact),
          emailer_campaign: apolloSequence,
        })
        .passthrough(),
    }),
  },
  customFields: {
    search: request({
      url: () => `/typed_custom_fields`,
      method: 'get',
      query: ({ page }: { page?: number }) => shake({ page }),
      schema: z
        .object({
          typed_custom_fields: z.array(apolloCustomField),
        })
        .passthrough(),
    }),
    create: request({
      url: () => `/typed_custom_fields`,
      method: 'post',
      json: (customFieldCreate: ApolloCreateCustomField) =>
        shake(customFieldCreate),
      schema: z
        .object({
          typed_custom_field: apolloCustomField,
        })
        .passthrough(),
    }),
  },
  emailAccounts: {
    list: request({
      url: () => `/email_accounts`,
      method: 'get',
      query: ({ page }: { page?: number }) => shake({ page }),
      schema: z
        .object({
          email_accounts: z.array(apolloEmailAccount),
        })
        .passthrough(),
    }),
  },
  sequenceSteps: {
    create: request({
      url: () => `/emailer_steps`,
      method: 'post',
      json: (step: ApolloCreateSequenceStep) => shake(step),
      schema: apolloSequenceStep,
    }),
  },
  sequenceTemplate: {
    update: request({
      url: ({ id }: { id: string }) => `/emailer_touches/${id}`,
      method: 'put',
      json: (template: ApolloUpdateSequenceTemplate) => shake(template),
      schema: z
        .object({
          emailer_touch: z
            .object({
              id: z.string(),
            })
            .passthrough(),
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
    json: ({ body }: { body?: Record<string, unknown> }) => body,
    schema: z.any(),
  }),
};

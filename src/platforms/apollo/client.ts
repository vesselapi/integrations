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

const request = makeRequestFactory(async (auth, options) => {
  const api_key = await auth.getToken();
  return {
    ...options,
    url: `${BASE_URL}/${options.url}`,
    query:
      options.method === 'get'
        ? {
            ...options.query,
            api_key,
          }
        : options.query,
    json: options.json
      ? {
          ...options.json,
          api_key,
        }
      : undefined,
  };
});

export const client = {
  users: {
    search: request(({ page }: { page?: number }) => ({
      url: `/users/search`,
      method: 'get',
      query: shake({ page }),
      schema: z
        .object({
          users: z.array(apolloUser),
          pagination: apolloPaginatedResponse,
        })
        .passthrough(),
    })),
  },
  accounts: {
    search: request(
      ({
        q_organization_name,
        page,
      }: {
        q_organization_name?: string;
        page?: number;
      }) => ({
        url: `/accounts/search`,
        method: 'post',
        json: shake({ page, q_organization_name }),
        schema: z
          .object({
            accounts: z.array(apolloAccount),
            pagination: apolloPaginatedResponse,
          })
          .passthrough(),
      }),
    ),
    create: request((account: ApolloAccountCreate) => ({
      url: `/accounts`,
      method: 'post',
      json: shake(account),
      schema: z
        .object({
          account: apolloAccount,
        })
        .passthrough(),
    })),
    update: request((account: { id: string } & ApolloAccountUpdate) => ({
      url: `/accounts/${account.id}`,
      method: 'put',
      json: shake(account),
      schema: z
        .object({
          account: apolloAccount,
        })
        .passthrough(),
    })),
  },
  contacts: {
    search: request(
      ({ q_keywords, page }: { q_keywords?: string; page?: number }) => ({
        url: `/contacts/search`,
        method: 'post',
        json: shake({ page, q_keywords }),
        schema: z
          .object({
            contacts: z.array(apolloContact),
            pagination: apolloPaginatedResponse,
          })
          .passthrough(),
      }),
    ),
    create: request((contact: ApolloContactCreate) => ({
      url: `/contacts`,
      method: 'post',
      json: shake(contact),
      schema: z
        .object({
          contact: apolloContact,
        })
        .passthrough(),
    })),
    update: request((contact: { id: string } & ApolloContactUpdate) => ({
      url: `/contacts/${contact.id}`,
      method: 'put',
      json: shake(contact),
      schema: z
        .object({
          contact: apolloContact,
        })
        .passthrough(),
    })),
  },
  emails: {
    search: request(
      ({
        emailer_campaign_id,
        page,
      }: {
        emailer_campaign_id?: string;
        page?: number;
      }) => ({
        url: `/emailer_messages/search`,
        method: 'post',
        json: shake({ page, emailer_campaign_id }),
        schema: z
          .object({
            emailer_messages: z.array(apolloEmailMessage),
          })
          .passthrough(),
      }),
    ),
  },
  activities: {
    list: request(
      ({ contact_id, types }: { contact_id?: string; types?: string[] }) => ({
        url: `/activities`,
        method: 'get',
        query: shake({
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
    ),
  },
  sequences: {
    search: request(
      ({ q_keywords, page }: { q_keywords?: string; page?: number }) => ({
        url: `/emailer_campaigns/search`,
        method: 'post',
        json: shake({ page, q_keywords }),
        schema: z
          .object({
            emailer_campaigns: z.array(apolloSequence),
            pagination: apolloPaginatedResponse,
          })
          .passthrough(),
      }),
    ),
    create: request((sequence: ApolloCreateSequence) => ({
      url: `/emailer_campaigns`,
      method: 'post',
      json: shake(sequence),
      schema: z
        .object({
          emailer_campaign: apolloSequence,
        })
        .passthrough(),
    })),
    start: request(
      ({
        emailer_campaign_id,
        contact_ids,
        send_email_from_email_account_id,
      }: {
        emailer_campaign_id: string;
        contact_ids: string[];
        send_email_from_email_account_id?: string;
      }) => ({
        url: `/emailer_campaigns/${emailer_campaign_id}/add_contact_ids`,
        method: 'post',
        json: shake({
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
    ),
  },
  customFields: {
    list: request(({ page }: { page?: number }) => ({
      url: `/typed_custom_fields`,
      method: 'get',
      query: shake({ page }),
      schema: z
        .object({
          typed_custom_fields: z.array(apolloCustomField),
        })
        .passthrough(),
    })),
    create: request((customFieldCreate: ApolloCreateCustomField) => ({
      url: `/typed_custom_fields`,
      method: 'post',
      json: shake(customFieldCreate),
      schema: z
        .object({
          typed_custom_field: apolloCustomField,
        })
        .passthrough(),
    })),
  },
  emailAccounts: {
    list: request(() => ({
      url: `/email_accounts`,
      method: 'get',
      schema: z
        .object({
          email_accounts: z.array(apolloEmailAccount),
        })
        .passthrough(),
    })),
  },
  sequenceSteps: {
    create: request((step: ApolloCreateSequenceStep) => ({
      url: `/emailer_steps`,
      method: 'post',
      json: shake(step),
      schema: apolloSequenceStep,
    })),
  },
  sequenceTemplates: {
    update: request(
      (template: { id: string } & ApolloUpdateSequenceTemplate) => ({
        url: `/emailer_touches/${template.id}`,
        method: 'put',
        json: shake(template),
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
    ),
  },
  passthrough: request.passthrough(),
};

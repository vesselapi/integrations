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
      options.method === 'GET'
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
      method: 'GET',
      query: shake({ page }),
      schema: z.object({
        users: z.array(apolloUser),
        pagination: apolloPaginatedResponse,
      }),
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
        method: 'POST',
        json: shake({ page, q_organization_name }),
        schema: z.object({
          accounts: z.array(apolloAccount),
          pagination: apolloPaginatedResponse,
        }),
      }),
    ),
    create: request((account: ApolloAccountCreate) => ({
      url: `/accounts`,
      method: 'POST',
      json: shake(account),
      schema: z.object({
        account: apolloAccount,
      }),
    })),
    update: request((account: { id: string } & ApolloAccountUpdate) => ({
      url: `/accounts/${account.id}`,
      method: 'PUT',
      json: shake(account),
      schema: z.object({
        account: apolloAccount,
      }),
    })),
  },
  contacts: {
    search: request(
      ({ q_keywords, page }: { q_keywords?: string; page?: number }) => ({
        url: `/contacts/search`,
        method: 'POST',
        json: shake({ page, q_keywords }),
        schema: z.object({
          contacts: z.array(apolloContact),
          pagination: apolloPaginatedResponse,
        }),
      }),
    ),
    create: request((contact: ApolloContactCreate) => ({
      url: `/contacts`,
      method: 'POST',
      json: shake(contact),
      schema: z.object({
        contact: apolloContact,
      }),
    })),
    update: request((contact: { id: string } & ApolloContactUpdate) => ({
      url: `/contacts/${contact.id}`,
      method: 'PUT',
      json: shake(contact),
      schema: z.object({
        contact: apolloContact,
      }),
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
        method: 'POST',
        json: shake({ page, emailer_campaign_id }),
        schema: z.object({
          emailer_messages: z.array(apolloEmailMessage),
        }),
      }),
    ),
  },
  activities: {
    list: request(
      ({ contact_id, types }: { contact_id?: string; types?: string[] }) => ({
        url: `/activities`,
        method: 'GET',
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
        schema: z.object({
          activities: z.array(apolloEmailActivity),
        }),
      }),
    ),
  },
  sequences: {
    search: request(
      ({ q_keywords, page }: { q_keywords?: string; page?: number }) => ({
        url: `/emailer_campaigns/search`,
        method: 'POST',
        json: shake({ page, q_keywords }),
        schema: z.object({
          emailer_campaigns: z.array(apolloSequence),
          pagination: apolloPaginatedResponse,
        }),
      }),
    ),
    create: request((sequence: ApolloCreateSequence) => ({
      url: `/emailer_campaigns`,
      method: 'POST',
      json: shake(sequence),
      schema: z.object({
        emailer_campaign: apolloSequence,
      }),
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
        method: 'POST',
        json: shake({
          contact_ids,
          emailer_campaign_id,
          send_email_from_email_account_id,
        }),
        schema: z.object({
          contacts: z.array(apolloContact),
          emailer_campaign: apolloSequence,
        }),
      }),
    ),
  },
  customFields: {
    list: request(({ page }: { page?: number }) => ({
      url: `/typed_custom_fields`,
      method: 'GET',
      query: shake({ page }),
      schema: z.object({
        typed_custom_fields: z.array(apolloCustomField),
      }),
    })),
    create: request((customFieldCreate: ApolloCreateCustomField) => ({
      url: `/typed_custom_fields`,
      method: 'POST',
      json: shake(customFieldCreate),
      schema: z.object({
        typed_custom_field: apolloCustomField,
      }),
    })),
  },
  emailAccounts: {
    list: request(() => ({
      url: `/email_accounts`,
      method: 'GET',
      schema: z.object({
        email_accounts: z.array(apolloEmailAccount),
      }),
    })),
  },
  sequenceSteps: {
    create: request((step: ApolloCreateSequenceStep) => ({
      url: `/emailer_steps`,
      method: 'POST',
      json: shake(step),
      schema: apolloSequenceStep,
    })),
  },
  sequenceTemplates: {
    update: request(
      (template: { id: string } & ApolloUpdateSequenceTemplate) => ({
        url: `/emailer_touches/${template.id}`,
        method: 'PUT',
        json: shake(template),
        schema: z.object({
          emailer_touch: z.object({
            id: z.string(),
          }),
        }),
      }),
    ),
  },
  passthrough: request.passthrough(),
};

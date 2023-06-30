import {
  formatUpsertInputWithNative,
  formatUrl,
  makeRequestFactory,
} from '@/sdk/client';
import { objectify, shake } from 'radash';
import { z } from 'zod';
import { BASE_URL, DEFAULT_PAGE_SIZE } from './constants';
import {
  apolloAccount,
  ApolloAccountCreate,
  ApolloAccountUpdate,
  apolloBootstrappedDataSchema,
  apolloCall,
  ApolloCallCreate,
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
  apolloLabel,
  apolloPaginatedResponse,
  apolloPerson,
  apolloSequence,
  apolloSequenceStep,
  apolloTask,
  ApolloTaskBulkCompleteInput,
  apolloTaskBulkCompleteResponse,
  ApolloUpdateSequenceTemplate,
  apolloUser,
} from './schemas';

const request = makeRequestFactory(async (auth, options) => {
  const api_key = await auth.getToken();
  return {
    ...options,
    url: formatUrl(BASE_URL, options.url),
    query:
      options.method === 'GET'
        ? [...(options.query ?? []), ['api_key', api_key]]
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
    search: request(
      ({
        page,
        perPage = DEFAULT_PAGE_SIZE,
      }: {
        page?: number;
        perPage?: number;
      }) => ({
        url: `/users/search`,
        method: 'GET',
        query: shake({ page, per_page: perPage }),
        schema: z.object({
          users: z.array(apolloUser),
          pagination: apolloPaginatedResponse,
        }),
      }),
    ),
  },
  accounts: {
    search: request(
      ({
        q_organization_name,
        page,
        perPage = DEFAULT_PAGE_SIZE,
      }: {
        q_organization_name?: string;
        page?: number;
        perPage?: number;
      }) => ({
        url: `/accounts/search`,
        method: 'POST',
        json: shake({ page, q_organization_name, per_page: perPage }),
        schema: z.object({
          accounts: z.array(apolloAccount),
          pagination: apolloPaginatedResponse,
        }),
      }),
    ),
    create: request((account: ApolloAccountCreate) => ({
      url: `/accounts`,
      method: 'POST',
      json: shake(formatUpsertInputWithNative(account)),
      schema: z.object({
        account: apolloAccount,
      }),
    })),
    update: request((account: { id: string } & ApolloAccountUpdate) => ({
      url: `/accounts/${account.id}`,
      method: 'PUT',
      json: shake(formatUpsertInputWithNative(account)),
      schema: z.object({
        account: apolloAccount,
      }),
    })),
  },
  contacts: {
    search: request(
      ({
        q_keywords,
        page,
        perPage = DEFAULT_PAGE_SIZE,
        contact_label_ids,
        emailer_campaign_ids,
        sort_by_field,
        sort_ascending,
      }: {
        q_keywords?: string;
        page?: number;
        perPage?: number;
        contact_label_ids?: string[];
        emailer_campaign_ids?: string[];
        sort_by_field?: string;
        sort_ascending?: boolean;
      }) => ({
        url: `/contacts/search`,
        method: 'POST',
        json: shake({
          page,
          q_keywords,
          contact_label_ids,
          emailer_campaign_ids,
          sort_by_field,
          sort_ascending,
          per_page: perPage,
        }),
        schema: z.object({
          contacts: z.array(apolloContact),
          pagination: apolloPaginatedResponse,
        }),
      }),
    ),
    create: request((contact: ApolloContactCreate) => ({
      url: `/contacts`,
      method: 'POST',
      json: shake(formatUpsertInputWithNative(contact)),
      schema: z.object({
        contact: apolloContact,
      }),
    })),
    update: request((contact: { id: string } & ApolloContactUpdate) => ({
      url: `/contacts/${contact.id}`,
      method: 'PUT',
      json: shake(formatUpsertInputWithNative(contact)),
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
        perPage = DEFAULT_PAGE_SIZE,
      }: {
        emailer_campaign_id?: string;
        page?: number;
        perPage?: number;
      }) => ({
        url: `/emailer_messages/search`,
        method: 'POST',
        json: shake({ page, emailer_campaign_id, per_page: perPage }),
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
                () => 'types[]',
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
      ({
        q_keywords,
        page,
        perPage = DEFAULT_PAGE_SIZE,
      }: {
        q_keywords?: string;
        page?: number;
        perPage?: number;
      }) => ({
        url: `/emailer_campaigns/search`,
        method: 'POST',
        json: shake({ page, q_keywords, per_page: perPage }),
        schema: z.object({
          emailer_campaigns: z.array(apolloSequence),
          pagination: apolloPaginatedResponse,
        }),
      }),
    ),
    create: request((sequence: ApolloCreateSequence) => ({
      url: `/emailer_campaigns`,
      method: 'POST',
      json: shake(formatUpsertInputWithNative(sequence)),
      schema: z.object({
        emailer_campaign: apolloSequence,
      }),
    })),
    start: request(
      ({
        emailer_campaign_id,
        contact_ids,
        send_email_from_email_account_id,
        $native,
      }: {
        emailer_campaign_id: string;
        contact_ids: string[];
        send_email_from_email_account_id?: string;
        $native?: Record<string, unknown>;
      }) => ({
        url: `/emailer_campaigns/${emailer_campaign_id}/add_contact_ids`,
        method: 'POST',
        json: shake({
          contact_ids,
          emailer_campaign_id,
          send_email_from_email_account_id,
          ...($native ?? {}),
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
      json: shake(formatUpsertInputWithNative(customFieldCreate)),
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
  labels: {
    search: request(
      ({
        team_lists_only,
        q_keywords,
        // @NOTE: This is a bug in the apollo API. The API
        // defaults to page 1 so if you pass page=0 you'll get
        // "1" as the next page cursor which results in 2 pages
        // of the first page.
        page = 1,
        perPage,
      }: {
        team_lists_only: boolean;
        q_keywords?: string;
        page?: number;
        perPage?: number;
      }) => ({
        url: `/labels/search`,
        method: 'POST',
        json: {
          ...shake({ q_keywords, page }),
          team_lists_only: team_lists_only ? ['yes'] : ['no'],
          per_page: perPage,
        },
        schema: z.object({
          labels: z.array(apolloLabel),
          pagination: apolloPaginatedResponse,
        }),
      }),
    ),
  },
  people: {
    search: request(
      ({
        q_keywords,
        contact_label_ids,
        emailer_campaign_ids,
        page,
        perPage = DEFAULT_PAGE_SIZE,
      }: {
        q_keywords?: string;
        contact_label_ids?: string[];
        emailer_campaign_ids?: string[];
        page?: number;
        perPage?: number;
      }) => ({
        url: `/mixed_people/search`,
        method: 'POST',
        json: shake({
          page,
          contact_label_ids,
          q_keywords,
          emailer_campaign_ids,
          per_page: perPage,
        }),
        schema: z.object({
          contacts: z.array(apolloContact),
          people: z.array(apolloPerson),
          pagination: apolloPaginatedResponse,
        }),
      }),
    ),
  },
  tasks: {
    search: request(
      ({
        user_ids,
        emailer_campaign_id,
        page,
        perPage = DEFAULT_PAGE_SIZE,
      }: {
        user_ids?: string[];
        emailer_campaign_id?: string;
        page?: number;
        perPage?: number;
      }) => ({
        url: `/tasks/search`,
        method: 'POST',
        json: shake({
          page,
          user_ids,
          sort_ascending: true,
          open_factor_names: ['task_types'],
          show_suggestions: false,
          per_page: perPage,
          emailer_campaign_id,
        }),
        schema: z.object({
          tasks: z.array(apolloTask),
          pagination: apolloPaginatedResponse,
        }),
      }),
    ),
    markComplete: request((bulkComplete: ApolloTaskBulkCompleteInput) => ({
      url: `/tasks/bulk_complete`,
      method: 'POST',
      json: shake(bulkComplete),
      schema: apolloTaskBulkCompleteResponse,
    })),
  },
  calls: {
    create: request((call: ApolloCallCreate) => ({
      url: `/phone_calls`,
      method: 'POST',
      json: shake(formatUpsertInputWithNative(call)),
      schema: z.object({
        phone_call: apolloCall,
      }),
    })),
    additionalBootstrappedData: request(
      ({ cacheKey }: { cacheKey: number }) => ({
        url: `/auth/additional_bootstrapped_data`,
        method: 'GET',
        query: shake({ cacheKey }),
        schema: apolloBootstrappedDataSchema,
      }),
    ),
  },
  sequenceSteps: {
    create: request((step: ApolloCreateSequenceStep) => ({
      url: `/emailer_steps`,
      method: 'POST',
      json: shake(formatUpsertInputWithNative(step)),
      schema: apolloSequenceStep,
    })),
  },
  sequenceTemplates: {
    update: request(
      (template: { id: string } & ApolloUpdateSequenceTemplate) => ({
        url: `/emailer_touches/${template.id}`,
        method: 'PUT',
        json: shake(formatUpsertInputWithNative(template)),
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

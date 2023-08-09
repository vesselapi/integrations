import { Auth, HttpsUrl } from '@/sdk';
import { formatUpsertInputWithNative, makeRequestFactory } from '@/sdk/client';
import { shake } from 'radash';
import { z } from 'zod';
import { formatQuery, salesforceQueryBuilder } from './actions/query-builder';
import { SALESFORCE_API_VERSION } from './constants';
import {
  salesforceAccount,
  SalesforceAccountCreate,
  salesforceAccountCreateResponse,
  salesforceAccountRelationalSelect,
  SalesforceAccountUpdate,
  salesforceConnectOrganizationResponse,
  salesforceContact,
  SalesforceContactCreate,
  salesforceContactCreateResponse,
  SalesforceContactUpdate,
  salesforceContentDocumentLink,
  SalesforceContentDocumentLinkCreate,
  salesforceContentDocumentLinkCreateResponse,
  salesforceContentNote,
  SalesforceContentNoteCreate,
  salesforceContentNoteCreateResponse,
  SalesforceContentNoteUpdate,
  SalesforceCustomFieldCreate,
  salesforceDescribeResponse,
  salesforceEmailMessage,
  SalesforceEmailMessageCreate,
  salesforceEmailMessageCreateResponse,
  salesforceEmailMessageRelation,
  salesforceEmailMessageRelationalSelect,
  SalesforceEmailMessageRelationCreate,
  salesforceEmailMessageRelationCreateResponse,
  SalesforceEmailMessageUpdate,
  salesforceEvent,
  SalesforceEventCreate,
  salesforceEventCreateResponse,
  salesforceEventRelation,
  salesforceEventRelationalSelect,
  SalesforceEventRelationCreate,
  salesforceEventRelationCreateResponse,
  SalesforceEventRelationUpdate,
  SalesforceEventUpdate,
  SalesforceFieldPermissions,
  salesforceJob,
  salesforceLead,
  SalesforceLeadCreate,
  salesforceLeadCreateResponse,
  SalesforceLeadUpdate,
  salesforceListView,
  salesforceListViewResult,
  salesforceNote,
  SalesforceNoteCreate,
  salesforceNoteCreateResponse,
  salesforceNoteRelationalSelect,
  SalesforceNoteUpdate,
  salesforceOpportunity,
  SalesforceOpportunityCreate,
  salesforceOpportunityCreateResponse,
  SalesforceOpportunityUpdate,
  salesforceQueryResponse,
  salesforceSObject,
  SalesforceSupportedObjectType,
  salesforceTask,
  SalesforceTaskCreate,
  salesforceTaskCreateResponse,
  salesforceTaskRelationalSelect,
  SalesforceTaskUpdate,
  salesforceUser,
} from './schemas';

const request = makeRequestFactory(async (auth, options) => {
  if (auth.type === 'oauth2') {
    const { oauthResponse } = await auth.getMetadata();
    const instanceUrl = oauthResponse.instance_url as HttpsUrl;
    return {
      ...options,
      url: `${instanceUrl}/services/data/${SALESFORCE_API_VERSION}${options.url}`,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${await auth.getToken()}`,
      },
    };
  } else {
    throw new Error('Salesforce only supports OAuth2 authentication');
  }
});

const query = {
  list: <T extends z.ZodType>({
    schema,
    objectType,
    relationalSelect,
    where,
  }: {
    schema: T;
    objectType: SalesforceSupportedObjectType;
    relationalSelect?: Partial<Record<SalesforceSupportedObjectType, string>>;
    where?: string;
  }) =>
    request(
      ({
        cursor,
        limit,
        associations,
      }: {
        cursor?: string;
        limit: number;
        associations?: SalesforceSupportedObjectType[];
      }) => ({
        url: `/query/?q=${salesforceQueryBuilder.list({
          objectType,
          cursor,
          limit,
          relationalSelect,
          where,
          associations,
        })}`,
        method: 'GET',
        schema: z.object({
          records: z.array(schema),
          totalSize: z.number(),
        }),
      }),
    ),
  find: <T extends z.ZodType>({
    schema,
    objectType,
    relationalSelect,
  }: {
    schema: T;
    objectType: SalesforceSupportedObjectType;
    relationalSelect?: Partial<Record<SalesforceSupportedObjectType, string>>;
  }) =>
    request(
      ({
        Id,
        associations,
      }: {
        Id: string;
        associations?: SalesforceSupportedObjectType[];
      }) => ({
        url: `/query/?q=${salesforceQueryBuilder.find({
          id: Id,
          objectType,
          relationalSelect,
          associations,
        })}`,
        method: 'GET',
        schema: z.object({
          records: z.array(schema),
        }),
      }),
    ),
  batchRead: <T extends z.ZodType>({
    schema,
    objectType,
    relationalSelect,
  }: {
    schema: T;
    objectType: SalesforceSupportedObjectType;
    relationalSelect?: Partial<Record<SalesforceSupportedObjectType, string>>;
  }) =>
    request(
      ({
        Ids,
        associations,
        limit,
        cursor,
      }: {
        Ids: string[];
        associations?: SalesforceSupportedObjectType[];
        limit: number;
        cursor?: string;
      }) => ({
        url: `/query/?q=${salesforceQueryBuilder.batchRead({
          ids: Ids,
          objectType,
          relationalSelect,
          associations,
          limit,
          cursor,
        })}`,
        method: 'GET',
        schema: z.object({
          records: z.array(schema),
        }),
      }),
    ),
  search: <T extends z.ZodType>({
    schema,
    objectType,
    relationalSelect,
  }: {
    schema: T;
    objectType: SalesforceSupportedObjectType;
    relationalSelect?: Partial<Record<SalesforceSupportedObjectType, string>>;
  }) =>
    request(
      ({
        where,
        associations,
        limit,
        cursor,
      }: {
        where: Record<string, string | string[]>;
        associations?: SalesforceSupportedObjectType[];
        limit?: number;
        cursor?: string;
      }) => ({
        url: `/query/?q=${salesforceQueryBuilder.search({
          where,
          objectType,
          relationalSelect,
          associations,
          limit,
          cursor,
        })}`,
        method: 'GET',
        schema: z.object({
          records: z.array(schema),
        }),
      }),
    ),
};

export const client = {
  sobjects: {
    list: request(() => ({
      url: `/sobjects`,
      method: 'GET',
      schema: salesforceSObject,
    })),
    describe: request(
      ({ objectType }: { objectType: SalesforceSupportedObjectType }) => ({
        url: `/sobjects/${objectType}/describe`,
        method: 'GET',
        schema: salesforceDescribeResponse,
      }),
    ),
  },
  connect: {
    organization: request(({}) => ({
      url: `/connect/organization`,
      method: 'GET',
      schema: salesforceConnectOrganizationResponse,
    })),
  },
  query: request(({ query }: { query: string }) => ({
    url: `/query/`,
    method: 'GET',
    query: { q: formatQuery(query) },
    schema: salesforceQueryResponse,
  })),
  jobs: {
    create: request(
      ({
        query,
        operation = 'query',
      }: {
        query: string;
        operation?: 'query' | 'queryAll';
      }) => ({
        url: `/jobs/query`,
        method: 'POST',
        json: {
          query,
          operation,
        },
        schema: salesforceJob,
      }),
    ),
    find: request(({ Id }: { Id: string }) => ({
      url: `/jobs/query/${Id}`,
      method: 'GET',
      schema: salesforceJob,
    })),
    // Returns a raw response. Use `jobs.fetch` to get the CSV results.
    fetch: async (auth: Auth, { Id }: { Id: string }) =>
      await request.fetch()(auth, {
        method: 'GET',
        url: `/jobs/query/${Id}/results`,
        headers: {
          'Content-Type': 'text/csv',
        },
      }),
  },
  users: {
    find: request(({ Id }: { Id: string }) => ({
      url: `/sobjects/User/${Id}/`,
      method: 'GET',
      schema: salesforceUser,
    })),
    list: query.list<typeof salesforceUser>({
      objectType: 'User',
      schema: salesforceUser,
    }),
    batchRead: query.batchRead<typeof salesforceUser>({
      objectType: 'User',
      schema: salesforceUser,
    }),
  },
  contacts: {
    find: query.find<typeof salesforceContact>({
      objectType: 'Contact',
      schema: salesforceContact,
    }),
    list: query.list<typeof salesforceContact>({
      objectType: 'Contact',
      schema: salesforceContact,
    }),
    batchRead: query.batchRead<typeof salesforceContact>({
      objectType: 'Contact',
      schema: salesforceContact,
    }),
    search: query.search<typeof salesforceContact>({
      objectType: 'Contact',
      schema: salesforceContact,
    }),
    create: request(({ Contact }: SalesforceContactCreate) => ({
      url: `/sobjects/Contact`,
      method: 'POST',
      json: formatUpsertInputWithNative(Contact),
      schema: salesforceContactCreateResponse,
    })),
    update: request(({ Id, Contact }: SalesforceContactUpdate) => ({
      url: `/sobjects/Contact/${Id}/`,
      method: 'PATCH',
      json: formatUpsertInputWithNative(Contact),
      schema: salesforceContact,
    })),
    delete: request(({ Id }: { Id: string }) => ({
      url: `/sobjects/Contact/${Id}/`,
      method: 'DELETE',
      schema: z.undefined(),
    })),
  },
  listViews: {
    find: request(({ Id }: { Id: string }) => ({
      url: `/sobjects/ListView/${Id}/`,
      method: 'GET',
      schema: salesforceListView,
    })),
    list: request(
      ({
        objectType,
        cursor,
        limit,
      }: {
        objectType?: SalesforceSupportedObjectType;
        cursor?: string;
        limit: number;
      }) => ({
        url: `/query/?q=${salesforceQueryBuilder.listListView({
          objectType,
          cursor,
          limit,
        })}`,
        method: 'GET',
        schema: z.object({
          records: z.array(salesforceListView),
          totalSize: z.number(),
        }),
      }),
    ),
  },
  listViewResults: {
    find: request(
      ({
        Id,
        objectType,
        limit,
        offset,
      }: {
        Id: string;
        objectType: SalesforceSupportedObjectType;
        limit?: number;
        offset?: number;
      }) => ({
        url: `/sobjects/${objectType}/listviews/${Id}/results`,
        method: 'GET',
        query: shake({ limit, offset }),
        schema: salesforceListViewResult,
      }),
    ),
  },
  accounts: {
    find: query.find<typeof salesforceAccount>({
      objectType: 'Account',
      schema: salesforceAccount,
      relationalSelect: salesforceAccountRelationalSelect,
    }),
    list: query.list<typeof salesforceAccount>({
      objectType: 'Account',
      schema: salesforceAccount,
      relationalSelect: salesforceAccountRelationalSelect,
    }),
    batchRead: query.batchRead<typeof salesforceAccount>({
      objectType: 'Account',
      schema: salesforceAccount,
      relationalSelect: salesforceAccountRelationalSelect,
    }),
    create: request(({ Account }: SalesforceAccountCreate) => ({
      url: `/sobjects/Account`,
      method: 'POST',
      json: formatUpsertInputWithNative(Account),
      schema: salesforceAccountCreateResponse,
    })),
    update: request(({ Id, Account }: SalesforceAccountUpdate) => ({
      url: `/sobjects/Account/${Id}/`,
      method: 'PATCH',
      json: formatUpsertInputWithNative(Account),
      schema: salesforceAccount,
    })),
    delete: request(({ Id }: { Id: string }) => ({
      url: `/sobjects/Account/${Id}/`,
      method: 'DELETE',
      schema: z.undefined(),
    })),
  },
  opportunities: {
    find: query.find<typeof salesforceOpportunity>({
      objectType: 'Opportunity',
      schema: salesforceOpportunity,
    }),
    list: query.list({
      objectType: 'Opportunity',
      schema: salesforceOpportunity,
    }),
    batchRead: query.batchRead({
      objectType: 'Opportunity',
      schema: salesforceOpportunity,
    }),
    create: request(({ Opportunity }: SalesforceOpportunityCreate) => ({
      url: `/sobjects/Opportunity`,
      method: 'POST',
      json: formatUpsertInputWithNative(Opportunity),
      schema: salesforceOpportunityCreateResponse,
    })),
    update: request(({ Id, Opportunity }: SalesforceOpportunityUpdate) => ({
      url: `/sobjects/Opportunity/${Id}/`,
      method: 'PATCH',
      json: formatUpsertInputWithNative(Opportunity),
      schema: salesforceOpportunity,
    })),
    delete: request(({ Id }: { Id: string }) => ({
      url: `/sobjects/Opportunity/${Id}/`,
      method: 'DELETE',
      schema: z.undefined(),
    })),
  },
  leads: {
    find: query.find<typeof salesforceLead>({
      objectType: 'Lead',
      schema: salesforceLead,
    }),
    list: query.list<typeof salesforceLead>({
      objectType: 'Lead',
      schema: salesforceLead,
    }),
    batchRead: query.batchRead<typeof salesforceLead>({
      objectType: 'Lead',
      schema: salesforceLead,
    }),
    create: request(({ Lead }: SalesforceLeadCreate) => ({
      url: `/sobjects/Lead`,
      method: 'POST',
      json: formatUpsertInputWithNative(Lead),
      schema: salesforceLeadCreateResponse,
    })),
    update: request(({ Id, Lead }: SalesforceLeadUpdate) => ({
      url: `/sobjects/Lead/${Id}/`,
      method: 'PATCH',
      json: formatUpsertInputWithNative(Lead),
      schema: salesforceLead,
    })),
    delete: request(({ Id }: { Id: string }) => ({
      url: `/sobjects/Lead/${Id}/`,
      method: 'DELETE',
      schema: z.undefined(),
    })),
    search: query.search<typeof salesforceLead>({
      objectType: 'Lead',
      schema: salesforceLead,
    }),
  },
  notes: {
    find: query.find<typeof salesforceNote>({
      objectType: 'Note',
      schema: salesforceNote,
      relationalSelect: salesforceNoteRelationalSelect,
    }),
    list: query.list<typeof salesforceNote>({
      objectType: 'Note',
      schema: salesforceNote,
      relationalSelect: salesforceNoteRelationalSelect,
    }),
    batchRead: query.batchRead<typeof salesforceNote>({
      objectType: 'Note',
      schema: salesforceNote,
      relationalSelect: salesforceNoteRelationalSelect,
    }),
    create: request(({ Note }: SalesforceNoteCreate) => ({
      url: `/sobjects/Note`,
      method: 'POST',
      json: formatUpsertInputWithNative(Note),
      schema: salesforceNoteCreateResponse,
    })),
    update: request(({ Id, Note }: SalesforceNoteUpdate) => ({
      url: `/sobjects/Note/${Id}/`,
      method: 'PATCH',
      json: formatUpsertInputWithNative(Note),
      schema: salesforceNote,
    })),
    delete: request(({ Id }: { Id: string }) => ({
      url: `/sobjects/Note/${Id}/`,
      method: 'DELETE',
      schema: z.undefined(),
    })),
  },
  contentNotes: {
    find: query.find<typeof salesforceContentNote>({
      objectType: 'ContentNote',
      schema: salesforceContentNote,
    }),
    list: query.list<typeof salesforceContentNote>({
      objectType: 'ContentNote',
      schema: salesforceContentNote,
    }),
    batchRead: query.batchRead<typeof salesforceContentNote>({
      objectType: 'ContentNote',
      schema: salesforceContentNote,
    }),
    create: request(({ ContentNote }: SalesforceContentNoteCreate) => ({
      url: `/sobjects/ContentNote`,
      method: 'POST',
      json: formatUpsertInputWithNative(ContentNote),
      schema: salesforceContentNoteCreateResponse,
    })),
    update: request(({ Id, ContentNote }: SalesforceContentNoteUpdate) => ({
      url: `/sobjects/ContentNote/${Id}/`,
      method: 'PATCH',
      json: formatUpsertInputWithNative(ContentNote),
      schema: salesforceContentNote,
    })),
    delete: request(({ Id }: { Id: string }) => ({
      url: `/sobjects/ContentNote/${Id}/`,
      method: 'DELETE',
      schema: z.undefined(),
    })),
    contentBody: {
      fetch: async (auth: Auth, { Content }: { Content: string }) =>
        await request.fetch()(auth, {
          method: 'GET',
          url: `/${Content.split('/').slice(4).join('/')}`,
          headers: {
            'Content-Type': 'text/plain',
          },
        }),
    },
  },
  contentDocumentLinks: {
    search: query.search<typeof salesforceContentDocumentLink>({
      objectType: 'ContentDocumentLink',
      schema: salesforceContentDocumentLink,
    }),
    create: request(
      ({ ContentDocumentLink }: SalesforceContentDocumentLinkCreate) => ({
        url: `/sobjects/ContentDocumentLink`,
        method: 'POST',
        json: formatUpsertInputWithNative(ContentDocumentLink),
        schema: salesforceContentDocumentLinkCreateResponse,
      }),
    ),
  },
  tasks: {
    find: query.find<typeof salesforceTask>({
      objectType: 'Task',
      schema: salesforceTask,
      relationalSelect: salesforceTaskRelationalSelect,
    }),
    list: query.list<typeof salesforceTask>({
      objectType: 'Task',
      schema: salesforceTask,
      relationalSelect: salesforceTaskRelationalSelect,
    }),
    batchRead: query.batchRead<typeof salesforceTask>({
      objectType: 'Task',
      schema: salesforceTask,
      relationalSelect: salesforceTaskRelationalSelect,
    }),
    create: request(({ Task }: SalesforceTaskCreate) => ({
      url: `/sobjects/Task`,
      method: 'POST',
      json: formatUpsertInputWithNative(Task),
      schema: salesforceTaskCreateResponse,
    })),
    update: request(({ Id, Task }: SalesforceTaskUpdate) => ({
      url: `/sobjects/Task/${Id}/`,
      method: 'PATCH',
      json: formatUpsertInputWithNative(Task),
      schema: salesforceTask,
    })),
    delete: request(({ Id }: { Id: string }) => ({
      url: `/sobjects/Task/${Id}/`,
      method: 'DELETE',
      schema: z.undefined(),
    })),
  },
  calls: {
    list: query.list<typeof salesforceTask>({
      objectType: 'Task',
      schema: salesforceTask,
      relationalSelect: salesforceTaskRelationalSelect,
      where: `TaskSubtype='Call'`,
    }),
  },
  events: {
    find: query.find<typeof salesforceEvent>({
      objectType: 'Event',
      schema: salesforceEvent,
      relationalSelect: salesforceEventRelationalSelect,
    }),
    list: query.list<typeof salesforceEvent>({
      objectType: 'Event',
      schema: salesforceEvent,
      relationalSelect: salesforceEventRelationalSelect,
    }),
    batchRead: query.batchRead<typeof salesforceEvent>({
      objectType: 'Event',
      schema: salesforceEvent,
      relationalSelect: salesforceEventRelationalSelect,
    }),
    create: request(({ Event }: SalesforceEventCreate) => ({
      url: `/sobjects/Event`,
      method: 'POST',
      json: formatUpsertInputWithNative(Event),
      schema: salesforceEventCreateResponse,
    })),
    update: request(({ Id, Event }: SalesforceEventUpdate) => ({
      url: `/sobjects/Event/${Id}/`,
      method: 'PATCH',
      json: formatUpsertInputWithNative(Event),
      schema: salesforceEvent,
    })),
    delete: request(({ Id }: { Id: string }) => ({
      url: `/sobjects/Event/${Id}/`,
      method: 'DELETE',
      schema: z.undefined(),
    })),
  },
  eventRelations: {
    find: query.find<typeof salesforceEventRelation>({
      objectType: 'EventRelation',
      schema: salesforceEventRelation,
    }),
    list: query.list<typeof salesforceEventRelation>({
      objectType: 'EventRelation',
      schema: salesforceEventRelation,
    }),
    batchRead: query.batchRead<typeof salesforceEventRelation>({
      objectType: 'EventRelation',
      schema: salesforceEventRelation,
    }),
    create: request(({ EventRelation }: SalesforceEventRelationCreate) => ({
      url: `/sobjects/EventRelation`,
      method: 'POST',
      json: formatUpsertInputWithNative(EventRelation),
      schema: salesforceEventRelationCreateResponse,
    })),
    update: request(({ Id, EventRelation }: SalesforceEventRelationUpdate) => ({
      url: `/sobjects/EventRelation/${Id}/`,
      method: 'PATCH',
      json: formatUpsertInputWithNative(EventRelation),
      schema: salesforceEventRelation,
    })),
    delete: request(({ Id }: { Id: string }) => ({
      url: `/sobjects/EventRelation/${Id}/`,
      method: 'DELETE',
      schema: z.undefined(),
    })),
  },
  emailMessages: {
    find: query.find<typeof salesforceEmailMessage>({
      objectType: 'EmailMessage',
      schema: salesforceEmailMessage,
      relationalSelect: salesforceEmailMessageRelationalSelect,
    }),
    list: query.list<typeof salesforceEmailMessage>({
      objectType: 'EmailMessage',
      schema: salesforceEmailMessage,
      relationalSelect: salesforceEmailMessageRelationalSelect,
    }),
    batchRead: query.batchRead<typeof salesforceEmailMessage>({
      objectType: 'EmailMessage',
      schema: salesforceEmailMessage,
      relationalSelect: salesforceEmailMessageRelationalSelect,
    }),
    create: request(({ EmailMessage }: SalesforceEmailMessageCreate) => ({
      url: `/sobjects/EmailMessage`,
      method: 'POST',
      json: formatUpsertInputWithNative(EmailMessage),
      schema: salesforceEmailMessageCreateResponse,
    })),
    update: request(({ Id, EmailMessage }: SalesforceEmailMessageUpdate) => ({
      url: `/sobjects/EmailMessage/${Id}/`,
      method: 'PATCH',
      json: formatUpsertInputWithNative(EmailMessage),
      schema: salesforceEmailMessage,
    })),
    delete: request(({ Id }: { Id: string }) => ({
      url: `/sobjects/EmailMessage/${Id}/`,
      method: 'DELETE',
      schema: z.undefined(),
    })),
  },
  emailMessageRelations: {
    find: query.find<typeof salesforceEmailMessageRelation>({
      objectType: 'EmailMessageRelation',
      schema: salesforceEmailMessageRelation,
    }),
    list: query.list<typeof salesforceEmailMessageRelation>({
      objectType: 'EmailMessageRelation',
      schema: salesforceEmailMessageRelation,
    }),
    batchRead: query.batchRead<typeof salesforceEmailMessageRelation>({
      objectType: 'EmailMessageRelation',
      schema: salesforceEmailMessageRelation,
    }),
    create: request(
      ({ EmailMessageRelation }: SalesforceEmailMessageRelationCreate) => ({
        url: `/sobjects/EmailMessageRelation`,
        method: 'POST',
        json: formatUpsertInputWithNative(EmailMessageRelation),
        schema: salesforceEmailMessageRelationCreateResponse,
      }),
    ),
    delete: request(({ Id }: { Id: string }) => ({
      url: `/sobjects/EmailMessageRelation/${Id}/`,
      method: 'DELETE',
      schema: z.undefined(),
    })),
  },
  customFields: {
    create: request(({ CustomField }: SalesforceCustomFieldCreate) => ({
      url: `/tooling/sobjects/CustomField`,
      method: 'POST',
      json: {
        ...CustomField,
        Metadata: formatUpsertInputWithNative(CustomField.Metadata),
      },
      schema: z.any(),
    })),
  },
  fieldPermissions: {
    update: request((update: SalesforceFieldPermissions) => ({
      url: `/sobjects/FieldPermissions`,
      method: 'POST',
      json: update,
      schema: z.any(),
    })),
  },
  passthrough: request.passthrough(),
  fetch: request.fetch(),
};

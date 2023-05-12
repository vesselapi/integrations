import { HttpsUrl } from '@/sdk';
import { makeRequestFactory } from '@/sdk/client';
import { z } from 'zod';
import { salesforceQueryBuilder } from './actions/query-builder';
import { SALESFORCE_API_VERSION } from './constants';
import {
  salesforceAccount,
  SalesforceAccountCreate,
  salesforceAccountCreateResponse,
  salesforceAccountRelationalSelect,
  SalesforceAccountUpdate,
  salesforceContact,
  SalesforceContactCreate,
  salesforceContactCreateResponse,
  SalesforceContactUpdate,
  SalesforceContentDocumentLinkCreate,
  salesforceContentDocumentLinkCreateResponse,
  SalesforceContentNote,
  salesforceContentNote,
  salesforceContentNoteContent,
  SalesforceContentNoteCreate,
  salesforceContentNoteCreateResponse,
  salesforceContentNoteRelationalSelect,
  SalesforceContentNoteUpdate,
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
  }: {
    schema: T;
    objectType: SalesforceSupportedObjectType;
    relationalSelect?: Partial<Record<SalesforceSupportedObjectType, string>>;
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
};

export const client = {
  sobjects: {
    list: request(() => ({
      url: `/sobjects`,
      method: 'GET',
      schema: salesforceSObject,
    })),
  },
  query: request(({ query }: { query: string }) => ({
    url: `/query/`,
    method: 'GET',
    query: { q: query.replace(/ /g, '+') },
    schema: salesforceQueryResponse,
  })),
  users: {
    find: request(({ Id }: { Id: string }) => ({
      url: `/sobjects/User/${Id}/`,
      method: 'GET',
      schema: salesforceUser,
    })),
    list: query.list({
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
    create: request(({ Contact }: SalesforceContactCreate) => ({
      url: `/sobjects/Contact`,
      method: 'POST',
      json: Contact,
      schema: salesforceContactCreateResponse,
    })),
    update: request(({ Id, Contact }: SalesforceContactUpdate) => ({
      url: `/sobjects/Contact/${Id}/`,
      method: 'PATCH',
      json: Contact,
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
        objectType?: string;
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
        cursor,
      }: {
        Id: string;
        objectType: string;
        cursor?: `/${string}`;
      }) => ({
        url: cursor ?? `/sobjects/${objectType}/listviews/${Id}/results`,
        method: 'GET',
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
    create: request(({ Account }: SalesforceAccountCreate) => ({
      url: `/sobjects/Account`,
      method: 'POST',
      json: Account,
      schema: salesforceAccountCreateResponse,
    })),
    update: request(({ Id, Account }: SalesforceAccountUpdate) => ({
      url: `/sobjects/Account/${Id}/`,
      method: 'PATCH',
      json: Account,
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
    create: request(({ Opportunity }: SalesforceOpportunityCreate) => ({
      url: `/sobjects/Opportunity`,
      method: 'POST',
      json: Opportunity,
      schema: salesforceOpportunityCreateResponse,
    })),
    update: request(({ Id, Opportunity }: SalesforceOpportunityUpdate) => ({
      url: `/sobjects/Opportunity/${Id}/`,
      method: 'PATCH',
      json: Opportunity,
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
    create: request(({ Lead }: SalesforceLeadCreate) => ({
      url: `/sobjects/Lead`,
      method: 'POST',
      json: Lead,
      schema: salesforceLeadCreateResponse,
    })),
    update: request(({ Id, Lead }: SalesforceLeadUpdate) => ({
      url: `/sobjects/Lead/${Id}/`,
      method: 'PATCH',
      json: Lead,
      schema: salesforceLead,
    })),
    delete: request(({ Id }: { Id: string }) => ({
      url: `/sobjects/Lead/${Id}/`,
      method: 'DELETE',
      schema: z.undefined(),
    })),
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
    create: request(({ Note }: SalesforceNoteCreate) => ({
      url: `/sobjects/Note`,
      method: 'POST',
      json: Note,
      schema: salesforceNoteCreateResponse,
    })),
    update: request(({ Id, Note }: SalesforceNoteUpdate) => ({
      url: `/sobjects/Note/${Id}/`,
      method: 'PATCH',
      json: Note,
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
      relationalSelect: salesforceContentNoteRelationalSelect,
    }),
    list: query.list<typeof salesforceContentNote>({
      objectType: 'ContentNote',
      schema: salesforceContentNote,
      relationalSelect: salesforceContentNoteRelationalSelect,
    }),
    create: request(({ ContentNote }: SalesforceContentNoteCreate) => ({
      url: `/sobjects/ContentNote`,
      method: 'POST',
      json: ContentNote,
      schema: salesforceContentNoteCreateResponse,
    })),
    update: request(({ Id, ContentNote }: SalesforceContentNoteUpdate) => ({
      url: `/sobjects/ContentNote/${Id}/`,
      method: 'PATCH',
      json: ContentNote,
      schema: salesforceContentNote,
    })),
    delete: request(({ Id }: { Id: string }) => ({
      url: `/sobjects/ContentNote/${Id}/`,
      method: 'DELETE',
      schema: z.undefined(),
    })),
    contentBody: request(
      ({ ContentNote }: { ContentNote: SalesforceContentNote }) => ({
        url: `${ContentNote.Content as `/${string}`}`,
        method: 'GET',
        schema: salesforceContentNoteContent,
      }),
    ),
  },
  contentDocumentLinks: {
    create: request(
      ({ ContentDocumentLink }: SalesforceContentDocumentLinkCreate) => ({
        url: `/sobjects/ContentDocumentLink`,
        method: 'POST',
        json: ContentDocumentLink,
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
    create: request(({ Task }: SalesforceTaskCreate) => ({
      url: `/sobjects/Task`,
      method: 'POST',
      json: Task,
      schema: salesforceTaskCreateResponse,
    })),
    update: request(({ Id, Task }: SalesforceTaskUpdate) => ({
      url: `/sobjects/Task/${Id}/`,
      method: 'PATCH',
      json: Task,
      schema: salesforceTask,
    })),
    delete: request(({ Id }: { Id: string }) => ({
      url: `/sobjects/Task/${Id}/`,
      method: 'DELETE',
      schema: z.undefined(),
    })),
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
    create: request(({ Event }: SalesforceEventCreate) => ({
      url: `/sobjects/Event`,
      method: 'POST',
      json: Event,
      schema: salesforceEventCreateResponse,
    })),
    update: request(({ Id, Event }: SalesforceEventUpdate) => ({
      url: `/sobjects/Event/${Id}/`,
      method: 'PATCH',
      json: Event,
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
    create: request(({ EventRelation }: SalesforceEventRelationCreate) => ({
      url: `/sobjects/EventRelation`,
      method: 'POST',
      json: EventRelation,
      schema: salesforceEventRelationCreateResponse,
    })),
    update: request(({ Id, EventRelation }: SalesforceEventRelationUpdate) => ({
      url: `/sobjects/EventRelation/${Id}/`,
      method: 'PATCH',
      json: EventRelation,
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
    create: request(({ EmailMessage }: SalesforceEmailMessageCreate) => ({
      url: `/sobjects/EmailMessage`,
      method: 'POST',
      json: EmailMessage,
      schema: salesforceEmailMessageCreateResponse,
    })),
    update: request(({ Id, EmailMessage }: SalesforceEmailMessageUpdate) => ({
      url: `/sobjects/EmailMessage/${Id}/`,
      method: 'PATCH',
      json: EmailMessage,
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
    create: request(
      ({ EmailMessageRelation }: SalesforceEmailMessageRelationCreate) => ({
        url: `/sobjects/EmailMessageRelation`,
        method: 'POST',
        json: EmailMessageRelation,
        schema: salesforceEmailMessageRelationCreateResponse,
      }),
    ),
    delete: request(({ Id }: { Id: string }) => ({
      url: `/sobjects/EmailMessageRelation/${Id}/`,
      method: 'DELETE',
      schema: z.undefined(),
    })),
  },
  passthrough: request.passthrough(),
};

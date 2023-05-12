import { Auth, ClientResult } from '@/sdk';
import { makeRequestFactory } from '@/sdk/client';
import { omit, shake } from 'radash';
import * as z from 'zod';
import { API_VERSION, BASE_URL, HUBSPOT_MAX_PAGE_SIZE } from './constants';
import {
  BatchReadObjectInput,
  callDispositionsSchema,
  callProperties,
  companyProperties,
  contactProperties,
  dealProperties,
  emailProperties,
  FindObjectInput,
  HubspotAssociationCreate,
  HubspotAssociationDelete,
  HubspotAssociationLabelInput,
  HubspotAssociationLabelOutput,
  hubspotAssociationLabelOutputSchema,
  HubspotCall,
  HubspotCallCreate,
  hubspotCallSchema,
  HubspotCallUpdate,
  HubspotCompany,
  HubspotCompanyCreate,
  hubspotCompanySchema,
  HubspotCompanyUpdate,
  HubspotContact,
  HubspotContactCreate,
  hubspotContactListSchema,
  hubspotContactSchema,
  HubspotContactUpdate,
  HubspotCustomPropertyCreate,
  HubspotDeal,
  HubspotDealCreate,
  hubspotDealSchema,
  HubspotDealUpdate,
  HubspotEmail,
  HubspotEmailCreate,
  hubspotEmailSchema,
  HubspotEmailUpdate,
  HubspotMeeting,
  HubspotMeetingCreate,
  hubspotMeetingSchema,
  HubspotMeetingUpdate,
  HubspotModule,
  HubspotNote,
  HubspotNoteCreate,
  hubspotNoteSchema,
  HubspotNoteUpdate,
  HubspotOwner,
  hubspotOwnerSchema,
  hubspotPropertySchema,
  HubspotTask,
  HubspotTaskCreate,
  hubspotTaskSchema,
  HubspotTaskUpdate,
  ListObjectInput,
  ListOutput,
  listResponseHubspotContactListContactsSchema,
  listResponseHubspotContactListSchema,
  listResponseSchema,
  meetingProperties,
  noteProperties,
  taskProperties,
} from './schemas';

const request = makeRequestFactory(async (auth, options) => {
  return {
    ...options,
    url: `${BASE_URL}${options.url}`,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${await auth.getToken()}`,
    },
  };
});

type requestFunctionType<I, O> = (
  auth: Auth,
  input: I,
) => Promise<ClientResult<O>>;

const makeClient = () => {
  const findObject = <TOutput>(
    module: HubspotModule | `objects/${HubspotModule}`,
    schema: z.ZodSchema,
    properties?: string[],
  ): requestFunctionType<FindObjectInput, TOutput> =>
    request(({ id, associations }: FindObjectInput) => ({
      url: `/crm/${API_VERSION}/${module}/${id}`,
      method: 'GET',
      query: shake({
        properties: properties?.join(','),
        associations: associations?.join(','),
      }),
      schema,
    }));

  const listObject = <TOutput>(
    module: HubspotModule | `objects/${HubspotModule}`,
    schema: z.ZodSchema,
    properties?: string[],
  ): requestFunctionType<ListObjectInput, TOutput> =>
    request(
      ({
        after,
        pageSize = HUBSPOT_MAX_PAGE_SIZE,
        associations,
      }: ListObjectInput) => ({
        url: `/crm/${API_VERSION}/${module}`,
        method: 'GET',
        query: shake({
          after,
          pageSize,
          properties: properties?.join(','),
          associations: associations?.join(','),
        }),
        schema,
      }),
    );

  const createObject = <TInput extends Record<string, unknown>, TOutput>(
    module: HubspotModule | `objects/${HubspotModule}`,
    schema: z.ZodSchema,
    properties?: string[],
  ): requestFunctionType<TInput, TOutput> =>
    request((body: TInput) => ({
      url: `/crm/${API_VERSION}/${module}/`,
      method: 'POST',
      schema,
      json: {
        properties: shake({
          hs_timestamp: properties?.includes('hs_timestamp')
            ? new Date().toISOString()
            : undefined,
          ...shake(omit(body, ['$native'])),
          ...(body.$native ? body.$native : {}),
        }),
      },
    }));

  const updateObject = <TInput extends Record<string, unknown>, TOutput>(
    module: HubspotModule | `objects/${HubspotModule}`,
    schema: z.ZodSchema,
  ): requestFunctionType<TInput, TOutput> =>
    request((body: TInput) => ({
      url: `/crm/${API_VERSION}/${module}/${body.id}`,
      method: 'PATCH',
      schema,
      json: {
        properties: {
          ...shake(omit(body, ['id', '$native'])),
          ...(body.$native ? body.$native : {}),
        },
      },
    }));

  const deleteObject = (
    module: HubspotModule | `objects/${HubspotModule}`,
  ): requestFunctionType<FindObjectInput, void> =>
    request((body: FindObjectInput) => ({
      url: `/crm/${API_VERSION}/${module}/${body.id}`,
      method: 'DELETE',
      schema: z.undefined(),
    }));

  const batchReadObject = <TOutput>(
    module: HubspotModule | `objects/${HubspotModule}`,
    schema: z.ZodSchema,
    properties?: string[],
  ): requestFunctionType<BatchReadObjectInput, TOutput> =>
    request(({ ids }: BatchReadObjectInput) => ({
      url: `/crm/${API_VERSION}/${module}/batch/read`,
      method: 'POST',
      json: {
        properties: properties ?? null,
        inputs: ids.map((id) => ({ id })),
        propertiesWithHistory: null,
      },
      schema,
    }));

  const crud = <
    TCreate extends Record<string, unknown>,
    TUpdate extends Record<string, unknown> & { id: string },
    TOutput extends Record<string, unknown>,
  >(
    module: HubspotModule | `objects/${HubspotModule}`,
    schema: z.ZodSchema,
    properties?: string[],
  ) => ({
    find: findObject<TOutput>(module, schema, properties),
    list: listObject<ListOutput<TOutput>>(
      module,
      listResponseSchema(schema),
      properties,
    ),
    create: createObject<TCreate, TOutput>(module, schema, properties),
    update: updateObject<TUpdate, TOutput>(module, schema),
    delete: deleteObject(module),
    batchRead: batchReadObject<ListOutput<TOutput>>(
      module,
      listResponseSchema(schema),
      properties,
    ),
  });

  return {
    owners: {
      find: findObject<HubspotOwner>('owners', hubspotOwnerSchema),
      list: listObject<ListOutput<HubspotOwner>>(
        'owners',
        listResponseSchema(hubspotOwnerSchema),
      ),
    },
    contacts: crud<HubspotContactCreate, HubspotContactUpdate, HubspotContact>(
      'objects/contacts',
      hubspotContactSchema,
      contactProperties,
    ),
    companies: crud<HubspotCompanyCreate, HubspotCompanyUpdate, HubspotCompany>(
      'objects/companies',
      hubspotCompanySchema,
      companyProperties,
    ),
    deals: crud<HubspotDealCreate, HubspotDealUpdate, HubspotDeal>(
      'objects/deals',
      hubspotDealSchema,
      dealProperties,
    ),
    notes: crud<HubspotNoteCreate, HubspotNoteUpdate, HubspotNote>(
      'objects/notes',
      hubspotNoteSchema,
      noteProperties,
    ),
    tasks: crud<HubspotTaskCreate, HubspotTaskUpdate, HubspotTask>(
      'objects/tasks',
      hubspotTaskSchema,
      taskProperties,
    ),
    meetings: crud<HubspotMeetingCreate, HubspotMeetingUpdate, HubspotMeeting>(
      'objects/meetings',
      hubspotMeetingSchema,
      meetingProperties,
    ),
    emails: crud<HubspotEmailCreate, HubspotEmailUpdate, HubspotEmail>(
      'objects/emails',
      hubspotEmailSchema,
      emailProperties,
    ),
    calls: {
      ...crud<HubspotCallCreate, HubspotCallUpdate, HubspotCall>(
        'objects/calls',
        hubspotCallSchema,
        callProperties,
      ),
      dispositions: request(({}) => ({
        url: `/calling/v1/dispositions`,
        method: 'GET',
        schema: callDispositionsSchema,
      })),
    },
    // HubSpot only has support for contact lists in v1 of the API
    contactLists: {
      find: request(({ id }: { id: string }) => ({
        url: `/contacts/v1/lists/${id}`,
        method: 'GET',
        schema: hubspotContactListSchema,
      })),
      list: request(
        ({
          offset,
          count = HUBSPOT_MAX_PAGE_SIZE,
        }: {
          offset?: number;
          count?: number;
        }) => ({
          url: `/contacts/v1/lists`,
          method: 'GET',
          schema: listResponseHubspotContactListSchema,
          query: shake({
            offset,
            count,
          }),
        }),
      ),
      contacts: request(
        ({
          listId,
          count = HUBSPOT_MAX_PAGE_SIZE,
          vidOffset,
        }: {
          listId: string;
          count?: number;
          vidOffset?: number;
        }) => ({
          url: `/contacts/v1/lists/${listId}/contacts/all`,
          method: 'GET',
          schema: listResponseHubspotContactListContactsSchema,
          query: shake({
            count,
            vidOffset,
          }),
        }),
      ),
    },
    properties: {
      list: request(({ objectType }: { objectType: HubspotModule }) => ({
        url: `/crm/${API_VERSION}/properties/${objectType}`,
        method: 'GET',
        schema: z.object({
          results: z.array(hubspotPropertySchema),
        }),
      })),
      create: request(
        ({ objectType, property }: HubspotCustomPropertyCreate) => ({
          url: `/crm/${API_VERSION}/properties/${objectType}`,
          method: 'POST',
          schema: hubspotPropertySchema,
          json: shake(property),
        }),
      ),
    },
    associations: {
      create: request(
        ({
          fromId,
          fromType,
          toId,
          toType,
          category,
          typeId,
        }: HubspotAssociationCreate) => ({
          url: `/crm/v4/objects/${fromType}/${fromId}/associations/${toType}/${toId}`,
          method: 'PUT',
          schema: listResponseSchema(hubspotPropertySchema),
          json: [
            shake({
              associationCategory: category,
              associationTypeId: typeId,
            }),
          ],
        }),
      ),
      delete: request(
        ({ fromId, fromType, toId, toType }: HubspotAssociationDelete) => ({
          url: `/crm/v4/objects/${fromType}/${fromId}/associations/${toType}/${toId}`,
          method: 'DELETE',
          schema: z.undefined(),
        }),
      ),
      labels: request(({ fromType, toType }: HubspotAssociationLabelInput) => ({
        url: `/crm/v4/associations/${fromType}/${toType}/labels`,
        method: 'GET',
        schema: listResponseSchema(hubspotAssociationLabelOutputSchema),
      })) as requestFunctionType<
        HubspotAssociationLabelInput,
        ListOutput<HubspotAssociationLabelOutput>
      >,
    },
    passthrough: request.passthrough(),
  };
};

export default makeClient();

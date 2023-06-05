import { Auth, ClientResult } from '@/sdk';
import {
  formatUpsertInputWithNative,
  formatUrl,
  makeRequestFactory,
} from '@/sdk/client';
import { omit, shake } from 'radash';
import * as z from 'zod';
import { API_VERSION, BASE_URL, PIPEDRIVE_MAX_PAGE_SIZE } from './constants';
import {
  BatchReadObjectInput,
  FindObjectInput,
  ListObjectInput,
  ListOutput,
  listResponseSchema,
  PipedriveDeal,
  PipedriveDealCreate,
  pipedriveDealSchema,
  PipedriveDealUpdate,
  PipedriveModule,
  PipedriveNote,
  PipedriveNoteCreate,
  pipedriveNoteSchema,
  PipedriveNoteUpdate,
  PipedrivePerson,
  PipedrivePersonCreate,
  PipedrivePersonUpdate,
  PipedriveUser,
  pipedriveUserSchema,
  SearchObjectInput,
  SearchOutput,
  searchResponseSchema,
  UpsertResponse,
  upsertResponseSchema,
} from './schemas';

const request = makeRequestFactory(async (auth, options) => {
  return {
    ...options,
    url: formatUrl(BASE_URL, options.url),
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
    module: PipedriveModule,
    schema: z.ZodSchema,
    properties?: string[],
  ): requestFunctionType<FindObjectInput, TOutput> =>
    request(({ id }: FindObjectInput) => ({
      url: `/${API_VERSION}/${module}/${id}`,
      method: 'GET',
      query: shake({
        properties: properties?.join(','),
      }),
      schema,
    }));

  const listObject = <TOutput>(
    module: PipedriveModule,
    schema: z.ZodSchema,
  ): requestFunctionType<ListObjectInput, ListOutput<TOutput>> =>
    request(({ start, limit = PIPEDRIVE_MAX_PAGE_SIZE }: ListObjectInput) => ({
      url: `/${API_VERSION}/${module}`,
      method: 'GET',
      query: shake({
        start,
        limit,
      }),
      schema: listResponseSchema(schema),
    }));

  const createObject = <TInput extends Record<string, unknown>>(
    module: PipedriveModule,
  ): requestFunctionType<TInput, UpsertResponse> =>
    request((body: TInput) => ({
      url: `/${API_VERSION}/${module}/`,
      method: 'POST',
      schema: upsertResponseSchema,
      json: formatUpsertInputWithNative(body),
    }));

  const updateObject = <TInput extends Record<string, unknown>>(
    module: PipedriveModule,
  ): requestFunctionType<TInput, UpsertResponse> =>
    request((body: TInput) => ({
      url: `/${API_VERSION}/${module}/${body.id}`,
      method: 'PUT',
      schema: upsertResponseSchema,
      json: formatUpsertInputWithNative(omit(body, ['id'])),
    }));

  const deleteObject = (
    module: PipedriveModule,
  ): requestFunctionType<FindObjectInput, void> =>
    request((body: FindObjectInput) => ({
      url: `/${API_VERSION}/${module}/${body.id}`,
      method: 'DELETE',
      schema: z.undefined(),
    }));

  const batchReadObject = <TOutput>(
    module: PipedriveModule,
    schema: z.ZodSchema,
  ): requestFunctionType<BatchReadObjectInput, SearchOutput<TOutput>> =>
    request(
      ({
        ids,
        start,
        limit = PIPEDRIVE_MAX_PAGE_SIZE,
      }: BatchReadObjectInput) => ({
        url: `/${API_VERSION}/${module}/search`,
        method: 'GET',
        query: {
          term: `id:${ids.join(',')}`,
          exact_match: `${1}`,
          start: `${start}`,
          limit: `${limit}`,
        },
        schema: searchResponseSchema(schema),
      }),
    );

  const searchObject = <TOutput>(
    module: PipedriveModule,
    schema: z.ZodSchema,
  ): requestFunctionType<SearchObjectInput, SearchOutput<TOutput>> =>
    request(
      ({
        term,
        exact_match,
        start,
        limit = PIPEDRIVE_MAX_PAGE_SIZE,
      }: SearchObjectInput) => ({
        url: `/${API_VERSION}/${module}/search`,
        method: 'GET',
        query: {
          term: term,
          exact_match: `${exact_match}`,
          start: `${start}`,
          limit: `${limit}`,
        },
        schema: searchResponseSchema(schema),
      }),
    );

  const crud = <
    TCreate extends Record<string, unknown>,
    TUpdate extends Record<string, unknown> & { id: string },
    TOutput extends Record<string, unknown>,
  >(
    module: PipedriveModule,
    schema: z.ZodSchema,
  ) => ({
    find: findObject<TOutput>(module, schema),
    list: listObject<TOutput>(module, schema),
    create: createObject<TCreate>(module),
    update: updateObject<TUpdate>(module),
    delete: deleteObject(module),
    batchRead: batchReadObject<TOutput>(module, schema),
    search: searchObject<TOutput>(module, schema),
  });

  return {
    users: {
      find: findObject<PipedriveUser>('users', pipedriveUserSchema),
      list: listObject<PipedriveUser>('users', pipedriveUserSchema),
      batchRead: batchReadObject<PipedriveUser>('users', pipedriveUserSchema),
    },
    persons: crud<
      PipedrivePersonCreate,
      PipedrivePersonUpdate,
      PipedrivePerson
    >('persons', pipedriveUserSchema),
    deals: crud<PipedriveDealCreate, PipedriveDealUpdate, PipedriveDeal>(
      'deals',
      pipedriveDealSchema,
    ),
    notes: crud<PipedriveNoteCreate, PipedriveNoteUpdate, PipedriveNote>(
      'notes',
      pipedriveNoteSchema,
    ),
    passthrough: request.passthrough(),
  };
};

export default makeClient();

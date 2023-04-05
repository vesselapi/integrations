import { HttpsUrl } from '@/sdk';
import { makeRequestFactory } from '@/sdk/client';
import { omit, shake } from 'radash';
import * as z from 'zod';
import { API_VERSION } from './constants';
import {
  ListObjectInput,
  listResponseSchema,
  RingcentralAuthAnswers,
  ringcentralCallLogSchema,
  RingcentralContactCreate,
  ringcentralContactSchema,
  RingcentralContactUpdate,
  ringcentralExtensionSchema,
  RingcentralRingOutStart,
  ringcentralRingOutStatusSchema,
  ringcentralUrlsByAccountType,
} from './schemas';

const baseUrl = (answers: RingcentralAuthAnswers) =>
  `${
    ringcentralUrlsByAccountType[answers.accountType]
  }/${API_VERSION}` as HttpsUrl;

const request = makeRequestFactory(async (auth, options) => {
  const { answers } = await auth.getMetadata();
  return {
    ...options,
    url: `${baseUrl(answers as RingcentralAuthAnswers)}${options.url}`,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${await auth.getToken()}`,
    },
  };
});

const findObject = (endpoint: string, schema: z.ZodSchema) =>
  request(({ id }: { id: string }) => ({
    url: `/${endpoint}/${id}`,
    method: 'get',
    schema,
  }));

const listObject = (endpoint: string, schema: z.ZodSchema) =>
  request(({ page, perPage }: ListObjectInput) => ({
    url: `/${endpoint}`,
    method: 'get',
    query: shake({
      page: page ? `${page}` : undefined,
      perPage: perPage ? `${perPage}` : undefined,
    }),
    schema: schema,
  }));

const createObject = <T extends Record<string, unknown>>(
  endpoint: string,
  schema: z.ZodSchema,
) =>
  request((body: T) => ({
    url: `/${endpoint}`,
    method: 'post',
    schema,
    json: body,
  }));

const updateObject = <T extends Record<string, unknown>>(
  endpoint: string,
  schema: z.ZodSchema,
) =>
  request((obj: T) => ({
    url: `/${endpoint}/${obj.id}`,
    method: 'put',
    schema,
    json: omit(obj, ['id']),
  }));

const makeClient = () => {
  return {
    extensions: {
      find: findObject('account/~/extension', ringcentralExtensionSchema),
      list: listObject(
        'account/~/extension',
        listResponseSchema(ringcentralExtensionSchema),
      ),
      ringOut: request((body: RingcentralRingOutStart) => ({
        url: `/account/~/extension/${body.extensionId}/ring-out`,
        method: 'post',
        json: omit(body, ['extensionId']),
        schema: ringcentralRingOutStatusSchema,
      })),
    },
    callLogs: {
      find: findObject('account/~/call-log', ringcentralCallLogSchema),
      list: listObject(
        'account/~/call-log',
        listResponseSchema(ringcentralCallLogSchema),
      ),
    },
    contacts: {
      find: findObject(
        'account/~/extension/~/address-book/contact',
        ringcentralContactSchema,
      ),
      list: listObject(
        'account/~/extension/~/address-book/contact',
        listResponseSchema(ringcentralContactSchema),
      ),
      create: createObject<RingcentralContactCreate>(
        'account/~/extension/~/address-book/contact',
        ringcentralContactSchema,
      ),
      update: updateObject<RingcentralContactUpdate>(
        'account/~/extension/~/address-book/contact',
        ringcentralContactSchema,
      ),
    },
    passthrough: request.passthrough(),
  };
};

export default makeClient();

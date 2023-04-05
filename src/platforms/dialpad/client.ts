import { HttpsUrl } from '@/sdk';
import { makeRequestFactory } from '@/sdk/client';
import * as z from 'zod';
import { API_VERSION } from './constants';
import {
  DialpadAuthAnswers,
  dialpadCallSchema,
  DialpadCallStart,
  DialpadClient,
  DialpadContactCreate,
  dialpadContactSchema,
  DialpadContactUpdate,
  DialpadModules,
  dialpadUrlsByAccountType,
  dialpadUserSchema,
  listResponseSchema,
} from './schemas';

const baseUrl = (answers: DialpadAuthAnswers) =>
  `${
    dialpadUrlsByAccountType[answers.accountType]
  }/api/${API_VERSION}` as HttpsUrl;

const request = makeRequestFactory(async (auth, options) => {
  const { answers } = await auth.getMetadata();
  return {
    ...options,
    url: `${baseUrl(answers as DialpadAuthAnswers)}${options.url}`,
    headers: {
      ...options.headers,
      Accept: 'application/json',
      Authorization: `Bearer ${await auth.getToken()}`,
    },
  };
});

const makeClient = (): DialpadClient => {
  const findObject = (module: DialpadModules, schema: z.ZodSchema) =>
    request(({ id }: { id: string }) => ({
      url: `/${module}/${id}`,
      method: 'GET',
      schema,
    }));

  const listObject = (module: DialpadModules, schema: z.ZodSchema) =>
    request(({ cursor }: { cursor?: string }) => ({
      url: `/${module}`,
      method: 'GET',
      query: cursor ? { cursor } : undefined,
      schema,
    }));

  const createObject = <T extends Record<string, unknown>>(
    module: DialpadModules,
    schema: z.ZodSchema,
  ) =>
    request((body: T) => ({
      url: `/${module}/`,
      method: 'POST',
      schema,
      json: body,
    }));

  const updateObject = <T extends Record<string, unknown>>(
    module: DialpadModules,
    schema: z.ZodSchema,
  ) =>
    request((body: T) => ({
      url: `/${module}/`,
      method: 'PUT',
      schema,
      json: body,
    }));

  return {
    users: {
      find: findObject('users', dialpadUserSchema),
      list: listObject('users', listResponseSchema(dialpadUserSchema)),
    },
    contacts: {
      find: findObject('contacts', dialpadContactSchema),
      list: listObject('contacts', listResponseSchema(dialpadContactSchema)),
      create: createObject<DialpadContactCreate>(
        'contacts',
        dialpadContactSchema.partial().required({
          id: true,
        }),
      ),
      update: updateObject<DialpadContactUpdate>(
        'contacts',
        dialpadContactSchema.partial().required({
          id: true,
        }),
      ),
    },
    calls: {
      find: findObject('calls', dialpadCallSchema),
      list: listObject('calls', listResponseSchema(dialpadCallSchema)),
      start: request((body: DialpadCallStart) => ({
        url: `/call`,
        method: 'POST',
        schema: z.object({
          id: z.string(),
        }),
        json: body,
      })),
    },
    passthrough: request.passthrough(),
  };
};

export default makeClient();

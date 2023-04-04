import { HttpsUrl } from '@/sdk';
import { makeRequestFactory } from '@/sdk/client';
import * as z from 'zod';
import { API_DOMAIN, API_VERSION } from './constants';
import {
  dialpadCallSchema,
  DialpadCallStart,
  DialpadClient,
  DialpadContactCreate,
  dialpadContactSchema,
  DialpadContactUpdate,
  DialpadModules,
  dialpadUserSchema,
  listResponseSchema,
} from './schemas';

const BASE_URL = `${API_DOMAIN}/${API_VERSION}` as HttpsUrl;

const request = makeRequestFactory(async (auth, options) => ({
  ...options,
  url: `${BASE_URL}${options.url}`,
  headers: {
    ...options.headers,
    Accept: 'application/json',
    Authorization: `Bearer ${await auth.getToken()}`,
  },
}));

const makeClient = (): DialpadClient => {
  const findObject = (module: DialpadModules, schema: z.ZodSchema) =>
    request(({ id }: { id: string }) => ({
      url: `/${module}/${id}`,
      method: 'get',
      schema,
    }));

  const listObject = (module: DialpadModules, schema: z.ZodSchema) =>
    request(({ cursor }: { cursor?: string }) => ({
      url: `/${module}`,
      method: 'get',
      query: cursor ? { cursor } : undefined,
      schema,
    }));

  const createObject = <T extends Record<string, unknown>>(
    module: DialpadModules,
    schema: z.ZodSchema,
  ) =>
    request((body: T) => ({
      url: `/${module}/`,
      method: 'post',
      schema,
      json: body,
    }));

  const updateObject = <T extends Record<string, unknown>>(
    module: DialpadModules,
    schema: z.ZodSchema,
  ) =>
    request((body: T) => ({
      url: `/${module}/`,
      method: 'put',
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
        method: 'post',
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

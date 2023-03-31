import { outreachUser } from '@/platforms/outreach/schemas';
import { HttpsUrl } from '@/sdk';
import { makeRequestFactory } from '@/sdk/client';
import { z } from 'zod';

const request = makeRequestFactory(async (auth, options) => {
  const { answers } = await auth.getMetadata();
  const apiUrl = answers['api-url'] as HttpsUrl;
  return {
    ...options,
    url: `${apiUrl}/${options.url}`,
    headers: {
      ...options.headers,
      'Api-Token': await auth.getToken(),
    },
  };
});

export const client = {
  users: {
    get: request(({ id }: { id: string }) => ({
      url: `/users/${id}`,
      method: 'get',
      schema: z
        .object({
          data: outreachUser,
        })
        .passthrough(),
    })),
  },
  passthrough: request.passthrough(),
};

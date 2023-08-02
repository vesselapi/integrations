import { BASE_URL } from './constants';
import { formatUrl, makeRequestFactory } from '@/sdk/client';

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

export const client = {
  passthrough: request.passthrough(),
};

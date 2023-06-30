import { formatUrl, makeRequestFactory } from '@/sdk/client';
import { API_VERSION, BASE_URL } from './constants';
import { mondayQueryResponse } from './schemas';

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

const makeClient = () => {
  return {
    query: request(({ query }: { query: string }) => ({
      url: `/${API_VERSION}`,
      method: 'POST',
      schema: mondayQueryResponse,
      json: { query },
    })),
    passthrough: request.passthrough(),
  };
};

export default makeClient();

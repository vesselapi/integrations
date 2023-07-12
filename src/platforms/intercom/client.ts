import { formatUrl, makeRequestFactory } from '@/sdk/client';
import { API_VERSION, BASE_URL } from './constants';

const request = makeRequestFactory(async (auth, options) => ({
  ...options,
  url: formatUrl(BASE_URL, options.url),
  headers: {
    ...options.headers,
    'Intercom-Version': API_VERSION,
    Authorization: `Bearer ${await auth.getToken()}`,
  },
}));

export const client = {
  passthrough: request.passthrough(),
};

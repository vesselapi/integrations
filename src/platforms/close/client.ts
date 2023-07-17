import { formatUrl, makeRequestFactory } from '@/sdk/client';
import { HttpsUrl } from '../../sdk';
import { API_VERSION, BASE_URL } from './constants';

const URL = `${BASE_URL}/${API_VERSION}` as HttpsUrl;
const request = makeRequestFactory(async (auth, options) => {
  return {
    ...options,
    url: formatUrl(URL, options.url),
    headers: {
      ...options.headers,
      Authorization: `Basic ${Buffer.from(
        await auth.getToken(),
        'binary',
      ).toString('base64')}`,
    },
  };
});

export const client = {
  passthrough: request.passthrough(),
};

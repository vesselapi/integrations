import { HttpsUrl } from '@/sdk';
import { formatUrl, makeRequestFactory } from '@/sdk/client';
import { API_VERSION } from './constants';

const request = makeRequestFactory(async (auth, options) => {
  const { answers } = await auth.getMetadata();
  const url =
    `https://${answers.subdomain}.freshdesk.com/api/${API_VERSION}` as HttpsUrl;
  return {
    ...options,
    url: formatUrl(url, options.url),
    headers: {
      ...options.headers,
      Authorization: `Basic ${await auth.getToken()}`,
    },
  };
});

export const client = {
  passthrough: request.passthrough(),
};

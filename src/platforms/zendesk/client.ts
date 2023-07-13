import { formatUrl, makeRequestFactory } from '@/sdk/client';
import { HttpsUrl } from '../../sdk';
import { API_VERSION } from './constants';

const request = makeRequestFactory(async (auth, options) => {
  const { answers } = await auth.getMetadata();
  const url =
    `https://${answers.subdomain}.zendesk.com/api/${API_VERSION}` as HttpsUrl;

  const token =
    auth.type === 'apiKey'
      ? Buffer.from(`${answers.email}/token:${await auth.getToken()}`).toString(
          'base64',
        )
      : await auth.getToken();
  return {
    ...options,
    url: formatUrl(url, options.url),
    headers: {
      ...options.headers,
      Authorization: `Basic ${token}`,
    },
  };
});

export const client = {
  passthrough: request.passthrough(),
};

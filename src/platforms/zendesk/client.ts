import { formatUrl, makeRequestFactory, toBase64 } from '@/sdk/client';
import { HttpsUrl } from '../../sdk';
import { API_VERSION } from './constants';

const request = makeRequestFactory(async (auth, options) => {
  if (auth.type === 'oauth2')
    throw new Error('Zendesk Does not support OAuth.');

  const { answers } = await auth.getMetadata();
  const url =
    `https://${answers.subdomain}.zendesk.com/api/${API_VERSION}` as HttpsUrl;
  const token =
    auth.type === 'apiKey'
      ? toBase64(`${answers.email}/token:${await auth.getToken()}`)
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

import { HttpsUrl } from '@/sdk';
import { formatUrl, makeRequestFactory, toBase64 } from '@/sdk/client';
import { API_VERSION } from './constants';

const request = makeRequestFactory(async (auth, options) => {
  const { answers } = await auth.getMetadata();
  const url = answers.wooCommerceUrl as HttpsUrl;
  const creds = toBase64(`${answers.consumerKey}:${answers.consumerSecret}`);
  return {
    ...options,
    url: formatUrl(`${url}/wp-json/wc/${API_VERSION}`, options.url),
    headers: {
      ...options.headers,
      Authorization: `Basic ${creds}`,
    },
  };
});

export const client = {
  passthrough: request.passthrough(),
};

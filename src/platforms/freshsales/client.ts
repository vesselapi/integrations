import { HttpsUrl } from '@/sdk';
import { formatUrl, makeRequestFactory } from '@/sdk/client';

const request = makeRequestFactory(async (auth, options) => {
  const { answers } = await auth.getMetadata();
  const url = `https://${answers.subdomain}.freshsales.io/api` as HttpsUrl;
  return {
    ...options,
    url: formatUrl(url, options.url),
    headers: {
      ...options.headers,
      Authorization: `Token token=${await auth.getToken()}`,
    },
  };
});

export const client = {
  passthrough: request.passthrough(),
};

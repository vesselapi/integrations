import { formatUrl, makeRequestFactory } from '@/sdk/client';

const request = makeRequestFactory(async (auth, options) => {
  return {
    ...options,
    url: formatUrl(`https://api.affinity.co`, options.url),
    headers: {
      ...options.headers,
      Authorization: `Basic ${await auth.getToken()}`,
    },
  };
});

export const client = {
  passthrough: request.passthrough(),
};

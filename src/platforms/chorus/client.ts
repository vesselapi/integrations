import { formatUrl, makeRequestFactory } from '@/sdk/client';

const request = makeRequestFactory(async (auth, options) => {
  return {
    ...options,
    url: formatUrl(`https://chorus.ai/api`, options.url),
    headers: {
      ...options.headers,
      Authorization: `${await auth.getToken()}`,
    },
  };
});

export const client = {
  passthrough: request.passthrough(),
};

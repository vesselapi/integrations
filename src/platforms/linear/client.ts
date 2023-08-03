import { formatUrl, makeRequestFactory } from '@/sdk/client';
const request = makeRequestFactory(async (auth, options) => {
  return {
    ...options,
    url: formatUrl(`https://api.linear.app`, options.url),
    headers: {
      ...options.headers,
      Authorization: `Bearer ${await auth.getToken()}`,
    },
  };
});

export const client = {
  passthrough: request.passthrough(),
};

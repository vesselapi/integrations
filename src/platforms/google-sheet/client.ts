import { formatUrl, makeRequestFactory } from '@/sdk/client';;

const request = makeRequestFactory(async (auth, options) => {
  return {
    ...options,
    url: formatUrl(`https://sheets.googleapis.com`, options.url),
    headers: {
      ...options.headers,
      Authorization: `Bearer ${await auth.getToken()}`,
    },
  };
});

export const client = {
  passthrough: request.passthrough(),
};

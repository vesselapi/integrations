import { formatUrl, makeRequestFactory } from '@/sdk/client';
import { HttpsUrl } from '@/sdk';

const request = makeRequestFactory(async (auth, options) => {
  return {
    ...options,
// Since this integration works for any Twinfield product,
// the entire url must be specific by the user
url: options.url as `${HttpsUrl}/${string}`,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${await auth.getToken()}`,
    },
  };
});

export const client = {
  passthrough: request.passthrough(),
};

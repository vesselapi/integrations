import { HttpsUrl } from '@/sdk';
import { makeRequestFactory } from '@/sdk/client';
const request = makeRequestFactory(async (auth, options) => {
  return {
    ...options,
    // Since this integration works for any Netsuite product,
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

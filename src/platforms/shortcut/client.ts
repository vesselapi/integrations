import { formatUrl, makeRequestFactory } from '@/sdk/client';

const request = makeRequestFactory(async (auth, options) => {
  return {
    ...options,
    url: formatUrl(`https://api.app.shortcut.com`, options.url),
    headers: {
      ...options.headers,
      'Shortcut-Token': `${await auth.getToken()}`,
    },
  };
});

export const client = {
  passthrough: request.passthrough(),
};

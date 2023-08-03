import { formatUrl, makeRequestFactory } from '@/sdk/client';;

const request = makeRequestFactory(async (auth, options) => {
  return {
    ...options,
    url: formatUrl(`https://api.notion.com`, options.url),
    headers: {
      ...options.headers,
      "Notion-Version":"2022-06-28"
    },
  };
});

export const client = {
  passthrough: request.passthrough(),
};

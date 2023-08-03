import { formatUrl, makeRequestFactory } from '@/sdk/client';
const request = makeRequestFactory(async (auth, options) => {
  const { answers } = await auth.getMetadata();
  return {
    ...options,
    url: formatUrl(
      `https://start.exactonline.${answers.extension}/api`,
      options.url,
    ),
    headers: {
      ...options.headers,
      Authorization: `Bearer ${await auth.getToken()}`,
    },
  };
});

export const client = {
  passthrough: request.passthrough(),
};

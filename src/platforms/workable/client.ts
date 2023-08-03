import { formatUrl, makeRequestFactory } from '@/sdk/client';

    const request = makeRequestFactory(async (auth, options) => {
const { answers } = await auth.getMetadata();
      return {
        ...options,
        url: formatUrl(`https://${answers.subdomain}.workable.com`, options.url),
        headers: {
          ...options.headers,
          [object Object]
        },
      };
    });

    export const client = {
      passthrough: request.passthrough(),
    };

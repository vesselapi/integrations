import { formatUrl, makeRequestFactory } from '@/sdk/client';
import { HttpsUrl } from '../../sdk';
import { API_VERSION, MAX_PAGE_SIZE } from './constants';

const request = makeRequestFactory(async (auth, options) => {
  const { answers } = await auth.getMetadata();
  const url = `${answers.orgUrl}/api/data/${API_VERSION}` as HttpsUrl;

  return {
    ...options,
    url: formatUrl(url, options.url),
    headers: {
      ...options.headers,
      Authorization: `Bearer ${await auth.getToken()}`,
      Accept: 'application/json',
      'OData-MaxVersion': '4.0',
      'OData-Version': '4.0',
      'Content-Type': 'application/json; odata.metadata=minimal',
      Prefer: `odata.maxpagesize=${MAX_PAGE_SIZE}`,
    },
  };
});

export const client = {
  passthrough: request.passthrough(),
};

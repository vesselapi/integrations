import urlJoin from 'url-join';
import { PlatformClient, StandardToken } from '../../sdk/types';

const BASE_URL = 'https://api.aircall.io/';
const API_VERSION = 'v1';

const client: PlatformClient = {
  request: async (options, auth) => {
    const { path, method, body, query } = options;
    const authToken = (await auth.getToken()) as StandardToken;
    const url = new URL(urlJoin(BASE_URL, API_VERSION, path));
    if (query) {
      for (const [key, value] of Object.entries(query)) {
        url.searchParams.append(key, value);
      }
    }
    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${Buffer.from(authToken.apiToken).toString(
          'base64',
        )}`,
        'Content-Type': 'application/json',
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    return await response.json();
  },
};

export default client;

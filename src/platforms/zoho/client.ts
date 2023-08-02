import { makeRequestFactory } from '@/sdk/client';
import { HttpsUrl } from '../../sdk';
import { API_VERSION } from './constants';

const request = makeRequestFactory(async (auth, options) => {
  if (auth.type === 'oauth2') {
    const { oauthResponse } = await auth.getMetadata();
    const apiDomain = oauthResponse.api_domain as HttpsUrl;
    return {
      ...options,
      url: `${apiDomain}/crm/${API_VERSION}${options.url}`,
      headers: {
        ...options.headers,
        Authorization: `Zoho-oauthtoken ${await auth.getToken()}`,
      },
    };
  } else {
    throw new Error('Zoho only supports OAuth2 authentication');
  }
});

export const client = {
  passthrough: request.passthrough(),
};

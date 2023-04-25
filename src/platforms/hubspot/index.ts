import { auth, platform } from '@/sdk';
import client from './client';
import * as constants from './constants';
import { icon } from './icon';

export * as types from './schemas';
export default platform('hubspot', {
  auth: auth.oauth2({
    authUrl: `https://app.hubspot.com/oauth/authorize`,
    tokenUrl: `https://api.hubapi.com/oauth/v1/token`,
    tokenAuth: 'body',
    isRetryable: async ({ response }) => {
      return (await response.json()).category === 'EXPIRED_AUTHENTICATION';
    },
    default: true,
  }),
  display: { name: 'HubSpot', iconURI: icon, categories: ['crm'] },
  constants,
  client,
  actions: {},
});

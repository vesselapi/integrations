import { auth, platform } from '@/sdk';
import { guard } from 'radash';
import callDispositions from './actions/calls/dispositions';
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
      if (response.status === 204) return false;
      const checkExpiredAuth = async () =>
        (await response.json()).category === 'EXPIRED_AUTHENTICATION';
      return (await guard(checkExpiredAuth)) ?? false;
    },
    default: true,
  }),
  display: { name: 'HubSpot', iconURI: icon, categories: ['crm'] },
  constants,
  client,
  actions: {
    callDispositions,
  },
});

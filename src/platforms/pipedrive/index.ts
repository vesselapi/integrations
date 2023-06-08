import { auth, platform } from '@/sdk';
import client from './client';
import * as constants from './constants';
import { icon } from './icon';

export * as types from './schemas';
export default platform('pipedrive', {
  auth: auth.oauth2({
    authUrl: `https://oauth.pipedrive.com/oauth/authorize`,
    tokenUrl: `https://oauth.pipedrive.com/oauth/token`,
    tokenAuth: 'body',
    isRetryable: async ({ response }) => response.status === 401,
    default: true,
  }),
  display: { name: 'Pipedrive', iconURI: icon, categories: ['crm'] },
  constants,
  client,
  actions: {},
});

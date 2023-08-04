import { auth, platform } from '@/sdk';
import client from './client';
import * as constants from './constants';
import fullIcon from '@/platforms/pipedrive/logos/full';
import boxIcon from '@/platforms/pipedrive/logos/box';

export * as types from './schemas';
export default platform('pipedrive', {
  auth: auth.oauth2({
    authUrl: `https://oauth.pipedrive.com/oauth/authorize`,
    tokenUrl: `https://oauth.pipedrive.com/oauth/token`,
    tokenAuth: 'body',
    isRetryable: async ({ status }) => status === 401,
    default: true,
  }),
  display: {
    name: 'Pipedrive',
    logos: {
        defaultURI: fullIcon ?? boxIcon,
        fullURI: fullIcon,
        boxURI: boxIcon,
    },
    colors: {
        primary: '#08a742',
    },
    categories: ["crm"],
    },
  constants,
  client,
  actions: {},
});

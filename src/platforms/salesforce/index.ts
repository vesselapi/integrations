import { auth, platform } from '@/sdk';

import { client } from '@/platforms/salesforce/client';
import * as constants from '@/platforms/salesforce/constants';
import { icon } from '@/platforms/salesforce/icon';

export * as types from './schemas';
export default platform('salesforce', {
  auth: auth.oauth2({
    // TODO: Branch url based off isSandbox.
    authUrl: ({ answers }) =>
      'https://login.salesforce.com/services/oauth2/authorize',
    // TODO: Branch url based off isSandbox.
    tokenUrl: ({ answers }) =>
      'https://login.salesforce.com/services/oauth2/token',
  }),
  display: {
    name: 'Salesforce',
    iconURI: icon,
  },
  client,
  constants,
  actions: {},
});

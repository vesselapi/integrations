import { auth, platform } from '@/sdk';
import { client } from './client';
import * as constants from './constants';
import { icon } from './icon';

export default platform('dynamics-sales', {
  auth: auth.oauth2({
    authUrl: `https://login.microsoftonline.com/common/oauth2/v2.0/authorize`,
    tokenUrl: `https://login.microsoftonline.com/common/oauth2/v2.0/token`,
    questions: [
      {
        type: 'text',
        id: 'orgUrl',
        label: 'Organization URL',
      },
    ],
  }),
  display: {
    name: 'Microsoft Dynamics Sales',
    iconURI: icon,
    categories: ['crm'],
  },
  constants,
  client,
  actions: {},
});

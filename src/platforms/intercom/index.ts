import { auth, platform } from '../../sdk';

import { client } from './client';
import { icon } from './icon';

export default platform('intercom', {
  auth: [
    auth.oauth2({
      authUrl: `https://app.intercom.com/oauth`,
      tokenUrl: `https://api.intercom.io/auth/eagle/token`,
    }),
  ],
  display: {
    name: 'Intercom',
    iconURI: icon,
    categories: ['ticketing'],
  },
  client,
  constants: {},
  actions: {},
});

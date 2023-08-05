import { auth, platform } from '../../sdk';

import boxIcon from '@/platforms/intercom/logos/box';
import fullIcon from '@/platforms/intercom/logos/full';
import { client } from './client';

export default platform('intercom', {
  auth: [
    auth.oauth2({
      authUrl: `https://app.intercom.com/oauth`,
      tokenUrl: `https://api.intercom.io/auth/eagle/token`,
    }),
  ],
  display: {
    name: 'Intercom',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#1f8ded',
    },
    categories: ['ticketing'],
  },
  client,
  constants: {},
  actions: {},
});

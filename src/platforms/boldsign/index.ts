import { client } from '@/platforms/boldsign/client';
import boxIcon from '@/platforms/boldsign/logos/box';
import { auth, platform } from '@/sdk';

export default platform('boldsign', {
  auth: auth.oauth2({
    authUrl: 'https://account.boldsign.com/connect/authorize',
    tokenUrl: 'https://account.boldsign.com/connect/token',
  }),
  display: {
    name: 'Boldsign',
    logos: {
      defaultURI: boxIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#fe4802',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});

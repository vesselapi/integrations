import { client } from '@/platforms/square/client';
import boxIcon from '@/platforms/square/logos/box';
import fullIcon from '@/platforms/square/logos/full';
import { auth, platform } from '@/sdk';

export default platform('square', {
  auth: auth.oauth2({
    authUrl: 'https://connect.squareup.com/oauth2/authorize',
    tokenUrl: 'https://connect.squareup.com/oauth2/token',
    scopeSeparator: '+',
    authParams: {
      session: false,
    },
  }),
  display: {
    name: 'Square',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#006AFF',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});

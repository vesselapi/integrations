import { client } from '@/platforms/ramp/client';
import boxIcon from '@/platforms/ramp/logos/box';
import fullIcon from '@/platforms/ramp/logos/full';
import { auth, platform } from '@/sdk';

export default platform('ramp', {
  auth: auth.oauth2({
    authUrl: 'https://app.ramp.com/v1/authorize',
    tokenUrl: 'https://api.ramp.com/developer/v1/token',
    tokenAuth: 'header',
  }),
  display: {
    name: 'Ramp',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#787868',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});

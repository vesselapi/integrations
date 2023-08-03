import { client } from '@/platforms/factorial/client';
import boxIcon from '@/platforms/factorial/logos/box';
import fullIcon from '@/platforms/factorial/logos/full';
import { auth, platform } from '@/sdk';

export default platform('factorial', {
  auth: auth.oauth2({
    authUrl: 'https://api.factorialhr.com/oauth/authorize',
    tokenUrl: 'https://api.factorialhr.com/oauth/token',
  }),
  display: {
    name: 'Factorial',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#007C85',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});

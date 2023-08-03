import { client } from '@/platforms/greenhouse/client';
import boxIcon from '@/platforms/greenhouse/logos/box';
import fullIcon from '@/platforms/greenhouse/logos/full';
import { auth, platform } from '@/sdk';

export default platform('greenhouse', {
  auth: auth.oauth2({
    authUrl: 'https://api.greenhouse.io/oauth/authorize',
    tokenUrl: 'https://api.greenhouse.io/oauth/token',
  }),
  display: {
    name: 'Greenhouse',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#24A47F',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});

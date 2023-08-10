import { client } from '@/platforms/gumroad/client';
import boxIcon from '@/platforms/gumroad/logos/box';
import fullIcon from '@/platforms/gumroad/logos/full';
import { auth, platform } from '@/sdk';

export default platform('gumroad', {
  auth: auth.oauth2({
    authUrl: 'https://gumroad.com/oauth/authorize',
    tokenUrl: 'https://api.gumroad.com/oauth/token',
  }),
  display: {
    name: 'Gumroad',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#ff90e8',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});

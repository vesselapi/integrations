import { client } from '@/platforms/front/client';
import boxIcon from '@/platforms/front/logos/box';
import fullIcon from '@/platforms/front/logos/full';
import { auth, platform } from '@/sdk';

export default platform('front', {
  auth: auth.oauth2({
    authUrl: 'https://app.frontapp.com/oauth/authorize',
    tokenUrl: 'https://app.frontapp.com/oauth/token',
  }),
  display: {
    name: 'Front',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#ffeaf3',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});

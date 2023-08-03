import { client } from '@/platforms/payfit/client';
import boxIcon from '@/platforms/payfit/logos/box';
import fullIcon from '@/platforms/payfit/logos/full';
import { auth, platform } from '@/sdk';

export default platform('payfit', {
  auth: auth.oauth2({
    authUrl: 'https://oauth.payfit.com/authorize',
    tokenUrl: 'https://app.pagerduty.com/oauth/token',
  }),
  display: {
    name: 'Payfit',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#01C195',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});

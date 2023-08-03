import { client } from '@/platforms/pagerduty/client';
import fullIcon from '@/platforms/pagerduty/logos/full';
import { auth, platform } from '@/sdk';

export default platform('pagerduty', {
  auth: auth.oauth2({
   authUrl: "https://app.pagerduty.com/oauth/authorize",
   tokenUrl: "https://app.pagerduty.com/oauth/token"
    }),
  display: {
    name: 'Pagerduty',
    logos: {
     defaultURI: fullIcon,
     fullURI: fullIcon,
    },
    colors: {
      primary: '#038a24',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});

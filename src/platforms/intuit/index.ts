import { client } from '@/platforms/intuit/client';
import boxIcon from '@/platforms/intuit/logos/box';
import fullIcon from '@/platforms/intuit/logos/full';
import { auth, platform } from '@/sdk';

export default platform('intuit', {
  auth: auth.oauth2({
    authUrl: 'https://appcenter.intuit.com/connect/oauth2',
    tokenUrl: 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer',
  }),
  display: {
    name: 'Intuit',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#00254A',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});

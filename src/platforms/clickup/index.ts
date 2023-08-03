import { client } from '@/platforms/clickup/client';
import boxIcon from '@/platforms/clickup/logos/box';
import fullIcon from '@/platforms/clickup/logos/full';
import { auth, platform } from '@/sdk';

export default platform('clickup', {
  auth: auth.oauth2({
    authUrl: 'https://app.clickup.com/api',
    tokenUrl: 'https://api.clickup.com/api/v2/oauth/token',
  }),
  display: {
    name: 'Clickup',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#FD71AF',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});

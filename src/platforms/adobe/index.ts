import { client } from '@/platforms/adobe/client';
import boxIcon from '@/platforms/adobe/logos/box';
import fullIcon from '@/platforms/adobe/logos/full';
import { auth, platform } from '@/sdk';

export default platform('adobe', {
  auth: auth.oauth2({
    authUrl: `https://ims-na1.adobelogin.com/ims/authorize/v2`,
    tokenUrl: `https://ims-na1.adobelogin.com/ims/token/v3`,
    requiredScopes: ['offline_access'],
  }),
  display: {
    name: 'Adobe',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#ff0000',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});

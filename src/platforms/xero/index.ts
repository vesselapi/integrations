import { client } from '@/platforms/xero/client';
import fullIcon from '@/platforms/xero/logos/full';
import boxIcon from '@/platforms/xero/logos/box';
import { auth, platform } from '@/sdk';

export default platform('xero', {
  auth: auth.oauth2({
   authUrl: "https://login.xero.com/identity/connect/authorize",
   tokenUrl: "https://identity.xero.com/connect/token",
   requiredScopes: ["offline_access"]
    }),
  display: {
    name: 'Xero',
    logos: {
     defaultURI: fullIcon ?? boxIcon,
     fullURI: fullIcon,
     boxURI: boxIcon,
    },
    colors: {
      primary: '#06B3E8',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});

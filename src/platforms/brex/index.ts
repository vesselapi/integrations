import { client } from '@/platforms/brex/client';
import fullIcon from '@/platforms/brex/logos/full';
import boxIcon from '@/platforms/brex/logos/box';
import { auth, platform } from '@/sdk';

export default platform('brex', {
  auth: auth.oauth2({
   authUrl: "https://accounts-api.brex.com/oauth2/default/v1/authorize",
   tokenUrl: "https://accounts-api.brex.com/oauth2/default/v1/token",
   requiredScopes: ["offline_access"]
    }),
  display: {
    name: 'Brex',
    logos: {
     defaultURI: fullIcon ?? boxIcon,
     fullURI: fullIcon,
     boxURI: boxIcon,
    },
    colors: {
      primary: '#f46a35',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});

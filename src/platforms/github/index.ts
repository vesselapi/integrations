import { client } from '@/platforms/github/client';
import fullIcon from '@/platforms/github/logos/full';
import boxIcon from '@/platforms/github/logos/box';
import { auth, platform } from '@/sdk';

export default platform('github', {
  auth: auth.oauth2({
   authUrl: "https://github.com/login/oauth/authorize",
   tokenUrl: "https://github.com/login/oauth/access_token"
    }),
  display: {
    name: 'GitHub',
    logos: {
     defaultURI: fullIcon ?? boxIcon,
     fullURI: fullIcon,
     boxURI: boxIcon,
    },
    colors: {
      primary: '#28a745',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});

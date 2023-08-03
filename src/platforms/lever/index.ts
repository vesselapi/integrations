import { client } from '@/platforms/lever/client';
import fullIcon from '@/platforms/lever/logos/full';
import boxIcon from '@/platforms/lever/logos/box';
import { auth, platform } from '@/sdk';

export default platform('lever', {
  auth: auth.oauth2({
   authUrl: "https://auth.lever.co/authorize",
   tokenUrl: "https://auth.lever.co/oauth/token",
   authParams: {
      "prompt": "consent",
      "audience": "https://api.lever.co/v1"
}
    }),
  display: {
    name: 'Lever',
    logos: {
     defaultURI: fullIcon ?? boxIcon,
     fullURI: fullIcon,
     boxURI: boxIcon,
    },
    colors: {
      primary: '#464646',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});

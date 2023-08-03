import { client } from '@/platforms/boldsign/client';
import fullIcon from '@/platforms/boldsign/logos/full';
import { auth, platform } from '@/sdk';

export default platform('boldsign', {
  auth: auth.oauth2({
   authUrl: "https://account.boldsign.com/connect/authorize",
   tokenUrl: "https://account.boldsign.com/connect/token",
   authParams: {}}),
  display: {
    name: 'Boldsign',
    logos: {
     defaultURI: fullIcon,
     fullURI: fullIcon,
    },
    colors: {
      primary: '#f8f700',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});

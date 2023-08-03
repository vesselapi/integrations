import { client } from '@/platforms/boldsign/client';
import { auth, platform } from '@/sdk';

export default platform('boldsign', {
  auth: auth.oauth2({
   authUrl: "https://account.boldsign.com/connect/authorize",
   tokenUrl: "https://account.boldsign.com/connect/token"}),
  display: {
    name: 'Boldsign',
    logos: {
     defaultURI: fullIcon,
    },
    colors: {
      primary: '#000000',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});

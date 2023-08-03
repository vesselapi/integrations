import { client } from '@/platforms/battlenet/client';
import { auth, platform } from '@/sdk';

export default platform('battlenet', {
  auth: auth.oauth2({
   authUrl: ({ answers }) => `${reg.clean(
        auth.authorization_url
      )}`,
   tokenUrl: ({ answers }) => `${reg.clean(auth.token_url)}`,
   authParams: {}}),
  display: {
    name: 'Battlenet',
    logos: {
     defaultURI: fullIcon,
    },
    colors: {
      primary: '#0e162d',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});

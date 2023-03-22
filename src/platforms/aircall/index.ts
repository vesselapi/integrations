import { auth, platform } from '../../sdk';
import { icon } from './icon';

export default platform('aircall', {
  auth: auth.oauth2({
    authUrl: 'https://dashboard.aircall.io/oauth/authorize',
    tokenUrl: 'https://api.aircall.io/v1/oauth/token',
  }),
  client: {
    passthrough: async () => ({} as any),
  },
  display: {
    name: 'Aircall',
    iconURI: icon,
  },
  constants: {},
  actions: {},
});

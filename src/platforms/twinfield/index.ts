import { client } from '@/platforms/twinfield/client';
import boxIcon from '@/platforms/twinfield/logos/box';
import fullIcon from '@/platforms/twinfield/logos/full';
import { auth, platform } from '@/sdk';

export default platform('twinfield', {
  auth: auth.oauth2({
    authUrl:
      'https://login.twinfield.com/auth/authentication/connect/authorize',
    tokenUrl: 'https://login.twinfield.com/auth/authentication/connect/token',
    requiredScopes: [
      'openid',
      'twf.user',
      'twf.organisation',
      'twf.organisationUser',
      'offline_access',
    ],
    authParams: {
      nonce: 'AnotherRandomStringTwinfield',
    },
  }),
  display: {
    name: 'Twinfield',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#85bc20',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});

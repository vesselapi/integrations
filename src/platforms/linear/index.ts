import { client } from '@/platforms/linear/client';
import boxIcon from '@/platforms/linear/logos/box';
import fullIcon from '@/platforms/linear/logos/full';
import { auth, platform } from '@/sdk';

export default platform('linear', {
  auth: auth.oauth2({
    authUrl: 'https://linear.app/oauth/authorize',
    tokenUrl: 'https://api.linear.app/oauth/token',
    scopeSeparator: ',',
    authParams: {
      prompt: 'consent',
    },
  }),
  display: {
    name: 'Linear',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#D9DCF8',
    },
    categories: ['ticketing'],
  },
  client,
  constants: {},
  actions: {},
});

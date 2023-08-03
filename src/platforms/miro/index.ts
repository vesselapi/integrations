import { client } from '@/platforms/miro/client';
import boxIcon from '@/platforms/miro/logos/box';
import fullIcon from '@/platforms/miro/logos/full';
import { auth, platform } from '@/sdk';

export default platform('miro', {
  auth: auth.oauth2({
    authUrl: 'https://miro.com/oauth/authorize',
    tokenUrl: 'https://api.miro.com/v1/oauth/token',
  }),
  display: {
    name: 'Miro',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#FFD02F',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});

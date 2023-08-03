import { client } from '@/platforms/calendly/client';
import boxIcon from '@/platforms/calendly/logos/box';
import fullIcon from '@/platforms/calendly/logos/full';
import { auth, platform } from '@/sdk';

export default platform('calendly', {
  auth: auth.oauth2({
    authUrl: 'https://auth.calendly.com/oauth/authorize',
    tokenUrl: 'https://auth.calendly.com/oauth/token',
  }),
  display: {
    name: 'Calendly',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#0AE8F0',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});

import { client } from '@/platforms/linkedin/client';
import boxIcon from '@/platforms/linkedin/logos/box';
import fullIcon from '@/platforms/linkedin/logos/full';
import { auth, platform } from '@/sdk';

export default platform('linkedin', {
  auth: auth.oauth2({
    authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
    tokenUrl: 'https://www.linkedin.com/oauth/v2/accessToken',
  }),
  display: {
    name: 'Linkedin',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#0073b1',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});

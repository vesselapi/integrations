import { client } from '@/platforms/zoom/client';
import boxIcon from '@/platforms/zoom/logos/box';
import fullIcon from '@/platforms/zoom/logos/full';
import { auth, platform } from '@/sdk';

export default platform('zoom', {
  auth: auth.oauth2({
    authUrl: 'https://zoom.us/oauth/authorize',
    tokenUrl: 'https://zoom.us/oauth/token',
  }),
  display: {
    name: 'Zoom',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#0B5CFF',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});

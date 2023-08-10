import { client } from '@/platforms/dropbox/client';
import boxIcon from '@/platforms/dropbox/logos/box';
import fullIcon from '@/platforms/dropbox/logos/full';
import { auth, platform } from '@/sdk';

export default platform('dropbox', {
  auth: auth.oauth2({
    authUrl: 'https://www.dropbox.com/oauth2/authorize',
    tokenUrl: 'https://api.dropboxapi.com/oauth2/token',
    authParams: {
      token_access_type: 'offline',
    },
  }),
  display: {
    name: 'Dropbox',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#0061ff',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});

import { client } from '@/platforms/google-mail/client';
import boxIcon from '@/platforms/google-mail/logos/box';
import fullIcon from '@/platforms/google-mail/logos/full';
import { auth, platform } from '@/sdk';

export default platform('google-mail', {
  auth: auth.oauth2({
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    authParams: {
      access_type: 'offline',
      prompt: 'consent',
    },
  }),
  display: {
    name: 'Gmail',
    logos: {
      defaultURI: fullIcon ?? boxIcon,
      fullURI: fullIcon,
      boxURI: boxIcon,
    },
    colors: {
      primary: '#4285f4',
    },
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
